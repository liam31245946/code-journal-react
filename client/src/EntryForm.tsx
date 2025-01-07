import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  readEntry,
  updateEntry,
  addEntry,
  UnsavedEntry,
  removeEntry,
} from './data';

export function EntryForm() {
  const [error, setError] = useState<unknown>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>('');
  const [photoUrl, setPhotoUrl] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  const entryId = Number(id);

  useEffect(() => {
    async function fetchEntry() {
      if (entryId) {
        try {
          const data = await readEntry(entryId);
          if (data) {
            setTitle(data.title);
            setPhotoUrl(data.photoUrl);
            setNotes(data.notes);
          } else {
            setError(`Entry with id ${entryId} not found`);
          }
        } catch (error) {
          setError(error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    }
    fetchEntry();
  }, [entryId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: UnsavedEntry = {
      title,
      photoUrl,
      notes,
    };
    console.log(newEntry);
    try {
      if (entryId) {
        await updateEntry({ ...newEntry, entryId });
      } else {
        await addEntry(newEntry);
      }
      navigate('/');
    } catch (error) {
      setError(error);
    }
  };

  const handleDelete = async () => {
    try {
      await removeEntry(entryId);
      navigate('/');
    } catch (error) {
      setError(error);
    }
  };

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (error) {
    return (
      <div>
        Error: {error instanceof Error ? error.message : 'Unknown Error'}
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label htmlFor="photoUrl">Photo URL</label>
        <input
          id="photoUrl"
          type="url"
          value={photoUrl}
          onChange={(e) => setPhotoUrl(e.target.value)}
          required
        />
        <label htmlFor="notes">Notes</label>
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          required
        />
        <button type="submit">Save</button>
        {id && (
          <>
            <button type="button" onClick={() => navigate('/')}>
              Cancel
            </button>
            <button
              type="button"
              onClick={() => setShowModal(true)} // Show modal
              style={{ color: 'red' }}>
              Delete
            </button>
          </>
        )}
      </form>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>Are you sure you want to delete this entry?</p>
            <button onClick={handleDelete} style={{ color: 'red' }}>
              Yes, Delete
            </button>
            <button onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
