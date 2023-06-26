import mongoose, {Schema, model} from 'mongoose';

const SuperheroSchema = mongoose.Schema({
    nickname: {
        type: String,
        default: '',
    },
    real_name: {
        type: String,
        default: '',
    },
    origin_description: {
        type: String,
        default: '',
    },
    superpowers: {
        type: String,
        default: '',
    },
    catch_phrase: {
        type: String,
        default: '',
    },
    images: {
        type: [String],
        default: ['']
    }

})

export default mongoose.model('superheroes', SuperheroSchema);