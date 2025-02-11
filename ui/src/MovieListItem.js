import React, { useState, useEffect } from 'react';

export default function MovieListItem(props) {
  const [actorsId, setActorsId] = useState([]);

  useEffect(() => {
    const fetchActorId = async () => {
      const response = await fetch(`/movies/${props.movie.id}/actors`);
      if (response.ok) {
        const Ids = await response.json();
        setActorsId(Ids);
      }
    };
    fetchActorId();
  }, [props.movie.id]);

  const actorsindex = actorsId.map(actorId => {
    return actorId.actor_id;
  });

  const actorsnames = props.actors.filter(actor => actorsindex.includes(actor.id)).map(actor => actor.name + ' ' + actor.surname);

  return (
    <div>
      <div>
        <strong>{props.movie.title}</strong>
        {' '}
        <span>({props.movie.year})</span>
        {' '}
        directed by {props.movie.director}
        {' '}
        <a onClick={props.onDelete}>Delete</a>
      </div>
      <p>Actors: {actorsnames.join(', ')}</p>
      {props.movie.description}
    </div>
  );
}
