import React, { useState } from 'react';
import Papa from 'papaparse';

const DataFromCSVFile = () => {
  const [file, setFile] = useState(null);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      Papa.parse(selectedFile, {
        header: true,
        complete: (result) => {
          setData(result.data);
          setError(null);
        },
        error: (parseError) => {
          setError('Ошибка при разборе данных из CSV');
        },
      });
    }
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleFileChange} />

      {data && (
        <div>
          <h2>Данные из файла:</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}

      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default DataFromCSVFile;
