export default function ActorListItem(props) {
    return (
        <div>
            <div>
                <strong>{props.actor.name}</strong>
                {' '}
                <strong>{props.actor.surname}</strong>
                {' '}
                <input type={"checkbox"} onClick={props.onSelect}/>
            </div>
        </div>
    );
}