import React, { useEffect, useState } from 'react';
import mapMarketImg from '../images/Local.svg'
import { Link } from 'react-router-dom'
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import Leaflet from 'leaflet';
import '../styles/pages/orphanages-map.css';
import api from '../services/api';

interface Orphanage {
    id: number;
    latitude: number;
    longitude: number;
    name: string;
}

const mapIcon = Leaflet.icon({
    iconUrl:  mapMarketImg,
    iconSize: [58, 68],
    iconAnchor: [29, 68],
    popupAnchor: [178, 2]
})

function OrphanagesMap() {
    const [orphanages, setOrphanages] = useState<Orphanage[]>([])

    //console.log(orphanages)

    useEffect(() => {
        api.get('orphanages').then(response => {
            setOrphanages(response.data)
            console.log(response);
        })
    }, []);

    return(
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarketImg} alt="Happy"/>
                    <h2>Escolha um orfanato no mapa</h2>
                    <p> Muitas crianças estão esperando sua visita</p>
                </header>
                <footer>
                    <strong>Recife</strong>
                    <span>Pernambuco</span>
                </footer>
            </aside>
            <Map 
            center={[-8.05428, -34.8813]}
            zoom={15}
            style={{ width: '100%', height:'100%' }} 
            >
                <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/>

                {orphanages.map(orphanage => {
                    return (
                <Marker
                    icon = { mapIcon }
                    position = { [orphanage.latitude, orphanage.longitude] }
                    key = { orphanage.id }
                >
                    <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                        {orphanage.name}
                        <Link to={`/orphanages/${orphanage.id}`}>
                        <FiArrowRight size={20} color="FFF" />
                        </Link>
                    </Popup>
                </Marker>
                    )
                })}                     
                               
            </Map>

            <Link to="/orphanages/create" className='create-orphanage'>
                <FiPlus size={52} color="#FFF" /> 
            </Link>

        </div>
    )
}

export default OrphanagesMap;
