import React, { createContext, useState, ReactNode } from 'react';

type Article = {
    title: string,
    thumbnailUrl: string,
    link: string
    pubDate: string
}

interface MyContextType {
    articles: Article[];
    setArticles: (articles: Article[]) => void;
}

export const MyContext = createContext<MyContextType>({articles: [], setArticles:() => {}});

interface MyProviderProps {
    children: ReactNode;
}

export const MyProvider: React.FC<MyProviderProps> = ({ children }) => {
    const [articles, setArticles] = useState<Article[]>([]);

    return (
        <MyContext.Provider value={{ articles, setArticles }}>
            {children}
        </MyContext.Provider>
    );
};
