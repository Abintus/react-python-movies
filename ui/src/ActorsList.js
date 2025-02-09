import ActorListItem from "./ActorListItem";

export default function MoviesList(props) {
    return <div>
        <h2>Actors</h2>
        <ul className="actors-list">
            {props.actors.map(actor => <li key={actor.id}>
                <ActorListItem actor={actor} onSelect={() => props.onSelectActor(actor)}/>
            </li>)}
        </ul>
    </div>;
}