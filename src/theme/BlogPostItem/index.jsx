import React from 'react';
import OriginalBlogPostItem from '@theme-original/BlogPostItem';
import Giscus from '@giscus/react';
import { useLocation } from '@docusaurus/router';

function CommentSection() {
    // Sử dụng pathname để tạo discussion riêng cho mỗi bài blog
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

export default function BlogPostItemWrapper(props) {
    const location = useLocation();

    // Chỉ hiển thị comment ở trang chi tiết bài viết
    // Trang danh sách blog có pathname là /blog hoặc /blog/
    const isBlogListPage = location.pathname === '/blog' ||
        location.pathname === '/blog/' ||
        location.pathname === '/blogs/blog' ||
        location.pathname === '/blogs/blog/';

    return (
        <>
            <OriginalBlogPostItem {...props} />
            {!isBlogListPage && (
                <div style={{ marginTop: '2rem' }}>
                    <CommentSection />
                </div>
            )}
        </>
    );
}
