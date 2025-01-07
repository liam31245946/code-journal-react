import { useNavigate } from 'react-router-dom';

type Entry = {
  id: number;
  title: string;
  photoUrl: string;
  notes: string;
};

type EntryListProps = {
  entries: Entry[];
};

export function EntriesList({ entries }: EntryListProps) {
  const navigate = useNavigate();
  return (
    <ul className="entry-list">
      {entries.map((entry) => (
        <li key={entry.id}>
          <div>
            <h2>
              {entry.title}{' '}
              <button onClick={() => navigate(`/entry-form/${entry.id}`)}>
                Edit
              </button>
            </h2>
            <img src={entry.photoUrl} alt={entry.title} />
            <p>{entry.notes}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
