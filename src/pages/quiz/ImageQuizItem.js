import {Badge, Button, Col, Form, Row} from "react-bootstrap";
import styles from './quiz.module.scss'
import {useRef} from "react";
import imageCompression from 'browser-image-compression';

const ImageQuizItem = ({ index, imageFile, answer, onChange, onRemove, imageUrl }) => {
    // 새로 업로드된 이미지가 있으면 그것을, 없으면 기존 이미지 URL을 사용
    const previewUrl = imageFile ? URL.createObjectURL(imageFile) : imageUrl;
    const inputRef = useRef(null);

    const handleSelectClick = () => {
        inputRef.current?.click();
    }

    const handleFileChange = async (e) => {
        const file = e.target.files?.[0] || null;
        if (!file) {
            onChange(index, 'imageFile', null);
            return;
        }
        try {
            const compressed = await imageCompression(file, {
                maxSizeMB: 1,
                useWebWorker: true,
            });
            const compressedFile = new File([compressed], file.name, { type: compressed.type || file.type });
            onChange(index, 'imageFile', compressedFile);
        } catch (err) {
            // 압축 실패 시 원본 파일 사용
            onChange(index, 'imageFile', file);
        }
    }

    return (
        <Row className={"m-2"}>
            <Col md={1} className={"d-flex align-items-center"}>
                <Badge bg={"danger"} className={`${styles.deleteBadge} `} onClick={() => onRemove(index)}>X</Badge>
            </Col>
            <Col md={6}>
                <div className="d-flex flex-column gap-2">
                    {previewUrl && (
                        <img
                            src={previewUrl}
                            alt={`question-${index}`}
                            style={{ width: '100%', height: 'auto', maxHeight: '240px', objectFit: 'contain', borderRadius: 4 }}
                        />
                    )}
                    <div className="d-flex gap-2">
                        <Button variant="outline-secondary" onClick={handleSelectClick} className="flex-grow-1">
                            {imageFile ? '이미지 변경' : '이미지 업로드'}
                        </Button>
                        {imageFile && (
                            <Button variant="outline-danger" onClick={() => onChange(index, 'imageFile', null)}>X</Button>
                        )}
                    </div>
                    <input
                        ref={inputRef}
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />
                </div>
            </Col>
            <Col md={5}>
                <Form>
                    <Form.Control
                        type="text"
                        placeholder="정답을 입력하세요"
                        value={answer}
                        onChange={(e) => onChange(index, 'answer', e.target.value)}
                    />
                </Form>
            </Col>
        </Row>
    );
}

export default ImageQuizItem;


