import React, {useRef, useState} from 'react';
import noImage from '../assets/images/no-image.png'

function ImageZone({ handleImageChange }) {
    const fileInputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState();

    const handleButtonClick = () => {
        fileInputRef.current.click(); // 버튼 클릭 시 숨겨진 파일 선택창 열기
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const imageUrl = URL.createObjectURL(file);
        setPreviewUrl(imageUrl);
        handleImageChange(file)
    };

    return (
        <div style={{
            width: '100%',
            height: '100%',
            maxWidth: '453px',
            maxHeight: '290px',
            position: 'relative', // 필요 시 자식 포지셔닝 대비
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'cover', // 이미지 넘침 방지
        }}>
            <img
                src={previewUrl ? previewUrl : noImage}
                alt="프로필"
                onClick={handleButtonClick}
                className="cursor-pointer"
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: '0.3s',
                    borderRadius: '4%',
                }}
            />
            <br />

            <input type="file"
                   accept="image/*"
                   ref={fileInputRef}
                   style={{ display: 'none' }}
                   onChange={handleFileChange}
            />
        </div>
    );
}

export default ImageZone;


