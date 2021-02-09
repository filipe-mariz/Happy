import Orphanage from '../models/orphanages';
import imagesView from './images_view'; 

export default {
    render(orphanage: Orphanage){
        return {
            id: orphanage.id,
            name: orphanage.name,
	        latitude: orphanage.latitude,
	        longitude: orphanage.longitude,
	        about: orphanage.about,
	        instructions: orphanage.instructions,
	        openning_hours: orphanage.openning_hours,
            open_on_weekend: orphanage.open_on_weekend,
            images: imagesView.renderMany(orphanage.image)
        };
    },

    renderMany(orphanages: Orphanage[]) {
        return orphanages.map(orphanage => this.render(orphanage));
    }
}