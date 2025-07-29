import { useCallback, useEffect, useRef, useState } from 'react';
//libs
import { useDropzone } from 'react-dropzone';
import classNames from 'classnames';

//redux
import { useUploadExtractionMutation } from '../../../../redux/services/extractionsApi';

//hooks
import { useModal } from 'hooks/useModal';

//components

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
import { ReactComponent as IconDoneDouble } from 'assets/icons/iconDoneDouble.svg';
import { ReactComponent as IconUploadBlack } from 'assets/icons/iconUploadBlack.svg';

//styles
import s from './UploadExtraction.module.scss';

const UploadExtraction = () => {
  const [uploadExtraction, { isLoading, isError }] = useUploadExtractionMutation();

  const [file, setFile] = useState(null);
  const [validationError, setValidationError] = useState('');
  const [uploadError, setUploadError] = useState('');
  const [success, setSucces] = useState('');

  const { hideModal } = useModal();

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      setUploadError('');
      setSucces('');
      setValidationError('');
    }
  }, []);

  const onDropRejected = useCallback(() => {
    setValidationError('Неверный формат файла');
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
      'text/plain': ['.txt'],
    },
  });

  const controllerRef = useRef(null);

  const handleSubmit = async () => {
    if (!file) return;

    const abortController = new AbortController();
    controllerRef.current = abortController;

    await uploadExtraction(file, {
      signal: abortController.signal,
    })
      .unwrap()
      .then(() => {
        setSucces('Успешно распознано');
      })
      .catch((error) => {
        setUploadError(`Не удалось распознать выписку.`);
      })
      .finally(() => {
        controllerRef.current = null;
      });
  };

  const handleCancelUpload = () => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
    setValidationError('');
    setUploadError('');
    setFile(null);
    setSucces('');
    hideModal();
  };

  useEffect(() => {
    return () => {
      setFile(null);
      setSucces('');
      setValidationError('');
      setUploadError('');
    };
  }, []);
  const getIcon = () => {
    if (!file) return IconDoneGrey;
    if (success) return IconDoneDouble;
    return IconDoneWhite;
  };

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
          <div className={s.sizeInfo}>Формат TXT до 20 Мбайт</div>
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

          {!success && <IconDelete className={s.delete} onClick={handleDelete} />}
        </div>

        {validationError && <div className={s.error}>{validationError}</div>}
        <div className={s.buttonsWrapper}>
          {!success && (
            <UniButton
              iconPosition="right"
              text={'Отмена'}
              icon={IconCloseBlue}
              type="outline"
              onClick={handleCancelUpload}
              className={classNames(s.submit)}
              width={100}
            />
          )}
          <UniButton
            disabled={!file}
            iconPosition="right"
            icon={getIcon()}
            text={success ? 'Готово' : 'Распознать'}
            isLoading={isLoading}
            type="primary"
            onClick={success ? handleCancelUpload : handleSubmit}
            className={classNames(s.submit, (!file || isLoading) && s.disabledLike)}
            // width={330}
          />
        </div>
      </div>
    </Modal>
  );
};

export default UploadExtraction;
