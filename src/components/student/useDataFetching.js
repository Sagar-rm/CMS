import { useState, useEffect } from 'react';

const useDataFetching = (dataType) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const simulatedData = {
        overview: {
          gpa: 3.5,
          attendance: 95,
          assignmentsDue: 3,
          upcomingExams: 2,
          courseProgress: 80,
          learningStreak: 5,
        },
        // Add other data types as needed
      };
      setData(simulatedData[dataType]);
      setLoading(false);
    };

    fetchData();
  }, [dataType]);

  return { data, loading };
};

export default useDataFetching;