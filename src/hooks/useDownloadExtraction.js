import { useLazyGetExtractionDownloadPathQuery } from '../redux/services/extractionsApi';

const useDownloadTransaction = () => {
  const [trigger] = useLazyGetExtractionDownloadPathQuery();

  const handleDownloadExtraction = async (id) => {
    try {
      const result = await trigger({ id }).unwrap();
      if (!result?.path) {
        alert('Файл не найден или еще не загружен.');
        return;
      }
      if (result.path) {
        const link = document.createElement('a');
        link.href = result.path;
        link.setAttribute('download', '');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (err) {
      alert('Произошла ошибка при скачивании');
      console.log(err);
    }
  };
  return handleDownloadExtraction;
};
export default useDownloadTransaction;
