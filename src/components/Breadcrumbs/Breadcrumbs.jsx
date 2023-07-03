import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

const Breadcrumbs = () => {
  const location = useLocation();
  const params = useParams();

  // Extract the path segments from the URL
  const pathSegments = location.pathname.split('/').filter((segment) => segment !== '');

  // Build the breadcrumb path
  const breadcrumbsPath = pathSegments.map((segment, index) => {
    const url = `/${pathSegments.slice(0, index + 1).join('/')}`;
    return {
      name: segment,
      url: url
    };
  });

  return (
    <nav>
      <ul>
        {breadcrumbsPath.map((crumb, index) => (
          <li key={index}>
            <Link to={crumb.url}>{crumb.name}</Link>
            {index < breadcrumbsPath.length - 1 && <span> / </span>}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
