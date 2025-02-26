/// <reference types="react-scripts" />

// Declare custom environment variables
interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    PUBLIC_URL: string;
	REACT_APP_API_URL: string;
}

// Extend the existing ProcessEnv interface
declare namespace NodeJS {
    interface ProcessEnv extends ProcessEnv { }
}
