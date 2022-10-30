import React from 'react';
import ErrorBoundary from "../ErrorBoundary";
const RemoteApp1 = React.lazy(() => import("App1/App1"));
const RemoteApp2 = React.lazy(() => import("App2/App2"));
const RemoteWrapper = ({ children }) => (
  <div>
    <ErrorBoundary>{children}</ErrorBoundary>
  </div>
);
const Home = () => {
  return (
    <>
    <h1>Список покупок на Host!</h1>
    <h2>Remote App1:</h2>
    <RemoteWrapper>
      <RemoteApp1 />
    </RemoteWrapper>
    <h2>Remote App2:</h2>
    <RemoteWrapper>
      <RemoteApp2 />
    </RemoteWrapper>
    <br/>
    <span>
      <a href="http://localhost:4000">Link to Remote App1</a>
    </span>
    {' | '}
    <span>
      <a href="http://localhost:4010">Link to Remote App2</a>
    </span>
    </>
  )
}
export default Home