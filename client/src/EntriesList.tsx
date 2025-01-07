import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Entry, readEntries } from './data';

export function EntriesList() {
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    async function fetchEntries() {
      const data = await readEntries();

      setEntries(data);
    }
    fetchEntries();
  }, []);

  return (
    <>
      <Link to="/entry-form" className="nav-item">
        <button>New</button>
      </Link>
      <ul className="entry-list">
        {entries.map((entry) => (
          <li key={entry.entryId}>
            <div>
              <h2>
                {entry.title}{' '}
                <Link to={`/entry-form/${entry.entryId}`}>
                  <button>Edit</button>
                </Link>
                ;
              </h2>
              <img src={entry.photoUrl} alt={entry.title} />
              <p>{entry.notes}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
