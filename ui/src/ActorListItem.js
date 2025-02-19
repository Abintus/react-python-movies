export default function ActorListItem(props) {
    return (
        <div>
            <div>
                <strong>{props.actor.name}</strong>
                {' '}
                <strong>{props.actor.surname}</strong>
                {' '}
                <input type={"checkbox"} onChange={(event) => props.onSelect(props.actor, event.target.checked)}/>
            </div>
        </div>
    );
}