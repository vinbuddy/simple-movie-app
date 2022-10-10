import { Button } from 'react-bootstrap';

function Genre({ genreIdList = [], type, size, className }) {
    return (
        <Button type={type} size={size}>
            Action
        </Button>
    );
}

export default Genre;
