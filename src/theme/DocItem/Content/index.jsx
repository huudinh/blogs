import React from 'react';
import OriginalContent from '@theme-original/DocItem/Content';
import Giscus from '@giscus/react';

function CommentSection() {
    // Sử dụng pathname để tạo discussion riêng cho mỗi trang
    const term = typeof window !== 'undefined' ? window.location.pathname : '';

    return (
        <Giscus
            repo="huudinh/blogs"
            repoId="R_kgDOPgXOZg"
            category="General"
            categoryId="DIC_kwDOPgXOZs4CzDN6"
            mapping="specific"
            term={term}
            reactionsEnabled="1"
            emitMetadata="0"
            inputPosition="bottom"
            theme="light"
            lang="vi"
        />
    );
}

export default function ContentWrapper(props) {
    return (
        <>
            <OriginalContent {...props} />
            <div style={{ marginTop: '3rem', marginBottom: '2rem' }}>
                <CommentSection />
            </div>
        </>
    );
}
