import SuperheroesModel from '../model/Superhero.js'
import fs from "fs";
import dayjs from 'dayjs';

import { fileURLToPath } from 'url';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class superheroController {

    async create(req, res) {
        try {
            const {
                nickname,
                real_name,
                origin_description,
                superpowers,
                catch_phrase,
            } = req.body;
            let superhero = await SuperheroesModel.create({ nickname, real_name, origin_description, superpowers, catch_phrase });
            const id = superhero._id.toString();
            res.status(200).json({ id });
        } catch (e) {
            console.log(e);
            res.status(500).send({ message: e.message });
        }
    }

    async uploadImages(req, res) {
        try {
            // get id
            const id = decodeURIComponent(req.query.id);
            // validator on images
            const files = req.files.filter(file => {
                if ((/^image\//).test(file?.mimetype)) return true;
                throw new Error('Files have to be images');
            });
            // link to img for db
            let staticPath = '/superhero-images'
            const imgPathArray = files.map(file => {
                return staticPath + `/${id}/` + file.filename;
            })
           await SuperheroesModel.findOneAndUpdate(
                { _id: id },
                { $set: { images: imgPathArray } },
                { new: true })
            res.status(200).end();
        } catch (e) {
            console.log(e)
            res.status(500).send({ message: e.message })
        }
    }


    async update(req, res) {
        try {
            // Delete file function 
            const { id } = req.query;
            const { nickname,
                real_name,
                origin_description,
                superpowers,
                catch_phrase,
                deleted
            } = req.body;
            //  Update or add date
            const updatedFields = {};
            if (nickname !== undefined) updatedFields.nickname = nickname;
            if (real_name !== undefined) updatedFields.real_name = real_name;
            if (origin_description !== undefined) updatedFields.origin_description = origin_description;
            if (superpowers !== undefined) updatedFields.superpowers = superpowers;
            if (catch_phrase !== undefined) updatedFields.catch_phrase = catch_phrase;

            const files = req.files.filter(file => {
                if ((/^image\//).test(file?.mimetype)) return true;
                throw new Error('Files have to be images');
            });
            let staticPath = '/superhero-images'
            const imgPathArray = files.map(file => {
                return staticPath + `/${id}/` + file.filename;
            })

            await SuperheroesModel.findOneAndUpdate(
                { _id: id },
                {
                    $set: updatedFields,
                    $push: {
                        images: {
                            $each: imgPathArray
                        }
                    }
                })
             // delete data
            if (deleted !== undefined) {
                const deletedFix = (typeof deleted === 'string')
                    ? [deleted]
                    : deleted;

                await SuperheroesModel.findOneAndUpdate(
                    { _id: id },
                    {
                        $pull: {
                            images: { $in: deleted }
                        }
                    },
                    { new: true }
                );

                deletedFix.forEach((ep) => {
                    let filename = ep.split('/').at(-1);
                    const filePath = path.resolve('public', 'superheroes', id, filename);

                    if (fs.existsSync(filePath)) {
                        fs.unlinkSync(filePath);
                    }
                })
            }
            res.status(200).end();
        } catch (e) {
            console.log(e);
            res.status(500).send({ message: e.message });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            await SuperheroesModel.findOneAndDelete({ _id: id });

            function deleteFolderRecursive(path) {
                if (fs.existsSync(path)) {
                    fs.readdirSync(path).forEach((file) => {
                        const curPath = `${path}/${file}`;
                        if (fs.lstatSync(curPath).isDirectory()) {
                            // delete folder
                            deleteFolderRecursive(curPath);
                        } else {
                            // delete file (base recursion)
                            fs.unlinkSync(curPath);
                        }
                    });
                    // delete empty folder
                    fs.rmdirSync(path);
                }
            }

            const uploadImages = path.resolve('public', 'superheroes', id);
            deleteFolderRecursive(uploadImages);
            res.status(200).end();
        } catch (e) {
            console.log(e);;
            res.status(500).send({ message: e.message });
        }
    }

    async getSome(req, res) {
        try {
            let { page, countPerPage } = req.params;
            page = +page;
            countPerPage = + countPerPage

            function isNumber(num) {
                if (typeof (num) === 'number' && isFinite(num)) return true;
                return false;
            }
            if (!(isNumber(page) && isNumber(countPerPage))) throw new Error('Params have to be a number');

            page = (page <= 0) ? 1 : page;
            countPerPage = (countPerPage <= 0) ? 1 : countPerPage;

            const allDockCount = await SuperheroesModel.countDocuments();

            const pageCount = Math.ceil(allDockCount / countPerPage);
            const currentPage = (page > pageCount) ? pageCount : page;
            let skip = (currentPage * countPerPage) - countPerPage;
            if (skip < 0) skip = 0;

            const documents = await SuperheroesModel.find()
                .skip(skip)
                .limit(countPerPage)
                .exec();

            let response = {
                pageCount,
                countPerPage,
                currentPage,
                documents

            }
            res.status(200).send(response);

        } catch (e) {
            res.status(500).send({ error: e.message })
            console.log(e)
        }
    }
}

export default new superheroController()