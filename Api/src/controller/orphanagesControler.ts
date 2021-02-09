import {Request, Response} from 'express'
import { getRepository } from 'typeorm';
import Orphanages from '../models/orphanages';
import orphanages_view from '../view/orphanages_view';
import orphanageView from '../view/orphanages_view';
import * as Yup from 'yup';

export default {
    async index(request: Request, response: Response){
        const orphanagesRepository = getRepository(Orphanages);

        const orphanages = await orphanagesRepository.find({
            relations: ['image']
        });

        return response.json(orphanages_view.renderMany(orphanages));
    },

    async show(request: Request, response: Response){
        const { id } = request.params
        
        const orphanagesRepository = getRepository(Orphanages);

        const orphanage = await orphanagesRepository.findOneOrFail(id, {
            relations: ['image']
        });

        return response.json(orphanageView.render(orphanage));
    },

    async create(request: Request, response: Response){
        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            openning_hours,
            open_on_weekend,
        } = request.body
    
        const orphanagesRepository = getRepository(Orphanages)
    
        const requestImages = request.files as Express.Multer.File[];
        const image = requestImages.map(image => {
            return { path: image.filename }
        })

        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            openning_hours,
            open_on_weekend,
            image,
        }

        const schemma = Yup.object().shape({
            name: Yup.string().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            instructions: Yup.string().required(),
            openning_hours: Yup.string().required(),
            open_on_weekend: Yup.boolean().required(),
            image: Yup.array(Yup.object().shape({
                path: Yup.string().required()
            }))
        });

        await schemma.validate(data, {
            abortEarly: false
        })

        const orphanages = orphanagesRepository.create(data);
    
        await orphanagesRepository.save(orphanages);
        response.status(201).json({ orphanages })
    }
}