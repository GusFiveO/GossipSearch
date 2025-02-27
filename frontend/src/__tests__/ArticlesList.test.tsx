import React from 'react';
import { render, screen } from '@testing-library/react';
import { ArticlesList } from '../components/ArticlesList';
import { MyContext } from '../context/context';

const mockArticles = [
    { title: 'Article 1', thumbnailUrl: 'url1', link: 'link1', pubDate: 'date1' },
    { title: 'Article 2', thumbnailUrl: 'url2', link: 'link2', pubDate: 'date2' },
];

test('renders articles list', () => {
    render(
        <MyContext.Provider value={{ articles: mockArticles, setArticles: () => {} }}>
            <ArticlesList />
        </MyContext.Provider>
    );

    mockArticles.forEach(article => {
        // Specifically target the div containing the article title
        const titleElement = screen.getByText(new RegExp(article.title, 'i'));
        expect(titleElement).toBeInTheDocument();
    });
});
