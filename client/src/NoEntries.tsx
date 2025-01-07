export function NoEntries() {
  const showAlert = () => {
    alert('This is an error!');
  };

  return (
    <>
      <p>No entries have been recorded.</p>
      <button onClick={showAlert}></button>
    </>
  );
}
