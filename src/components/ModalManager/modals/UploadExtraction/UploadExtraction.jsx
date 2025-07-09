import { useCallback, useEffect, useRef, useState } from 'react';
//libs
import { useDropzone } from 'react-dropzone';
import classNames from 'classnames';
//hooks
import { useModal } from 'hooks/useModal';
//components
import LoaderButton from 'components/General/LoaderButton/LoaderButton';
import Modal from 'components/General/Modal/Modal';
import UniButton from 'components/General/UniButton/UniButton';

//icons
import { ReactComponent as FolderIcon } from 'assets/icons/folderIcon.svg';
import { ReactComponent as IconCloseBlack } from 'assets/icons/iconCloseBlack.svg';
import { ReactComponent as IconCloseBlue } from 'assets/icons/iconCloseBlue.svg';
import { ReactComponent as IconCloseRound } from 'assets/icons/iconCloseRound.svg';
import { ReactComponent as IconDelete } from 'assets/icons/iconDelete.svg';
import { ReactComponent as IconDoneGrey } from 'assets/icons/iconDoneGrey.svg';
import { ReactComponent as IconDoneWhite } from 'assets/icons/iconDoneWhite.svg';
import { ReactComponent as IconUploadBlack } from 'assets/icons/iconUploadBlack.svg';
//styles
import s from './UploadExtraction.module.scss';

const UploadExtraction = () => {
  //   const [uploadDocument, { isLoading, isError }] = useUploadDocumentMutation();
  const isLoading = false;
  const [file, setFile] = useState(null);
  const [validationError, setValidationError] = useState('');
  const [uploadError, setUploadError] = useState('');
  const [success, setSucces] = useState('');

  const { modalProps, hideModal } = useModal();
  const isSubmitDisabled = file;

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      setUploadError('');
      setSucces('');
      setValidationError('');
    }
  }, []);

  const onDropRejected = useCallback(() => {
    setValidationError('Ошибка, проверь данные и загрузи снова');
    setFile(null);
  }, []);

  const handleDelete = () => {
    setFile(null);
    setValidationError('');
    setUploadError('');
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected,
    multiple: false,
    maxSize: 20 * 1024 * 1024,
    accept: {
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/pdf': ['.pdf'],
      'text/plain': ['.txt'],
    },
  });

  const controllerRef = useRef(null);

  const handleSubmit = async () => {
    if (!isSubmitDisabled) {
      const body = new FormData();
      body.append('file', file);
      body.append('filename', file.name);

      const abortController = new AbortController();
      controllerRef.current = abortController;

      try {
        // await uploadDocument(
        //   {
        //     id,
        //     body,
        //   },
        //   { signal: abortController.signal }
        // ).unwrap();

        setSucces('Успешно распознано');
      } catch (e) {
        if (e.name === 'AbortError') {
          console.log('Загрузка отменена');
        } else {
          setUploadError('Ошибка загрузки');
        }
      } finally {
        controllerRef.current = null;
      }
    }
  };

  const handleCancelUpload = () => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
    setValidationError('');
    setUploadError('');
  };

  useEffect(() => {
    return () => {
      setFile(null);
      setSucces('');
      setValidationError('');
      setUploadError('');
    };
  }, []);

  return (
    <Modal isOpen={true} onClose={hideModal}>
      <div className={s.modal}>
        <div className={s.modal_header}>
          <div className={s.title}>
            <IconUploadBlack />
            <h3>Загрузка выписки</h3>
          </div>
          <button className={s.close} onClick={hideModal}>
            <IconCloseBlack />
          </button>
        </div>

        <div
          {...getRootProps({
            className: classNames(s.dropzone, (file || uploadError) && s.dropzone_vis),
          })}
        >
          <input {...getInputProps()} />
          <div className={s.uploadLabel}>
            {isDragActive ? (
              <span>Отпустите здесь файл</span>
            ) : (
              <>
                Перетащи или <span className={s.uploadLink}>загрузи файл</span>
              </>
            )}
          </div>
          <div className={s.sizeInfo}>Файлы до 20 Мбайт</div>
        </div>

        <div className={classNames(s.file_info, file && s.file_info_vis)}>
          <div className={uploadError ? s.postErrorContainer : s.file}>
            {!uploadError ? <FolderIcon /> : <IconCloseRound />}

            <div className={s.textWrapper}>
              <div className={s.fileName}>{file?.name}</div>
              {(uploadError || success) && (
                <div className={classNames(s.postMsg, success && s.success)}>
                  {uploadError || success}
                </div>
              )}
            </div>
          </div>

          <IconDelete className={s.delete} onClick={handleDelete} />
        </div>

        {validationError && <div className={s.error}>{validationError}</div>}
        <div className={s.buttonsWrapper}>
          {' '}
          <UniButton
            iconPosition="right"
            text={'Отмена'}
            icon={IconCloseBlue}
            type="outline"
            onClick={handleCancelUpload}
            className={classNames(s.submit)}
            width={100}
          ></UniButton>
          <UniButton
            type="primary"
            onClick={handleSubmit}
            disabled={!isSubmitDisabled}
            className={classNames(s.submit)}
            width={330}
          >
            {!isLoading ? (
              <>
                <span>{success ? 'Готово' : 'Распознать'}</span>
                {!isSubmitDisabled ? <IconDoneGrey /> : <IconDoneWhite />}
              </>
            ) : (
              <div className={classNames(s.loader, s.loader_vis)}>
                <LoaderButton color="#FFF" />
              </div>
            )}
          </UniButton>
        </div>
      </div>
    </Modal>
  );
};

export default UploadExtraction;
