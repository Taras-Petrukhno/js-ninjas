import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
// Styles
import '../styles/pages/Main.scss';
// Components
import SuperheroesList from '../components/SuperheroesList';
import SuperheroCardModal from '../components/SuperheroCardModal';
import CUSuperheroModal from '../components/CUSuperheroModal';
import { isCUSuperheroModalShown } from '../store/reducers/superheroSlice';

function Main() {
  const modals = useSelector(state => state.superhero.modals);
  const error = useSelector(state => state.superhero.error);
  const isSuperheroCardShown = modals.superheroCard.show;
  const isCUSuperheroShown = modals.CUSuperhero.show;
  const dispatch = useDispatch();

  function onCreateHeroHandler() {
    dispatch(isCUSuperheroModalShown({ show: true, hero: null, mode: 'create' }))
  }
  
  useEffect(() => {
    // error handler
      if(error) {
        alert(error.message)
      }
  }, [error])
  // .modal-opened
  return (
    <div className={`wrapper ${(isCUSuperheroShown || isSuperheroCardShown) && "modal-opened"}`}>
      <section className="superhero">
        <div className="superhero__container">
          <SuperheroesList />
          {isSuperheroCardShown && <SuperheroCardModal />}
          {isCUSuperheroShown && <CUSuperheroModal />}
          <div onClick={onCreateHeroHandler} className='superhero__create-new'><span>Create</span> <span>superhero</span></div>
        </div>
      </section>
    </div>
  );
}

export default Main;
