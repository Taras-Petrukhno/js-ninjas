import supertest from 'supertest';
import app from './index';
import SuperheroesModel from './model/Superhero.js';

describe('Express server testing', () => {
    test('POST /superhero', async () => {

        const newSuperhero = {
            nickname: 'Batman',
            real_name: 'Bruce Wayne',
            origin_description: 'Superhero and other test text ',
            superpowers: ['Rich', 'Intelligence', ],
            catch_phrase: 'I am Batman',
          };

          const response = await supertest(app).post('/superhero').send(newSuperhero);

          expect(response.status).toBe(200);
          expect(response.body).toHaveProperty('id'); 
          
             // Is hero in db
      const superhero = await SuperheroesModel.findById(response.body.id);
      expect(superhero).toBeDefined();
      expect(superhero.nickname).toBe('Batman');
      expect(superhero.real_name).toBe('Bruce Wayne');
    })
})