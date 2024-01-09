import axios from 'axios';
import { Fragment, useCallback, useEffect, useState } from 'react';
import HeadTagEditor from './head-tag-editor';
import ErrorPage from './error-page';
import ThemeChanger from './theme-changer';
import AvatarCard from './avatar-card';
import Details from './details';
import Skill from './skill';
import Project from './project';
import Blog from './blog';
import Footer from './footer';
import Avatar from '@/assets/imgs/avatar.jpg';
import {
  genericError,
  getInitialTheme,
  noConfigError,
  notFoundError,
  setupHotjar,
  tooManyRequestError,
  sanitizeConfig,
} from '../helpers/utils';
import { HelmetProvider } from 'react-helmet-async';
// import PropTypes from 'prop-types';
import '../assets/index.css';
import { formatDistance } from 'date-fns';
import ExternalProject from './external-project';

const bgColor = 'bg-base-300';

const Home = ({ config }) => {
  console.log(config);
  const [error, setError] = useState(
    typeof config === 'undefined' && !config ? noConfigError : null
  );
  const [sanitizedConfig] = useState(
    typeof config === 'undefined' && !config ? null : sanitizeConfig(config)
  );
  const [theme, setTheme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [articles, setArticles] = useState(null);

  useEffect(() => {
    if (sanitizedConfig) {
      setTheme(getInitialTheme(sanitizedConfig.themeConfig));
      setupHotjar(sanitizedConfig.hotjar);
      loadData();
    }
  }, [sanitizedConfig]);

  useEffect(() => {
    theme && document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const loadData = useCallback(() => {
    let data = {
      avatar_url: Avatar,
      name: 'Pub的个人小站',
      bio: '致简｜致行',
    };
    let profileData = {
      avatar: data.avatar_url,
      name: data.name ? data.name : '',
      bio: data.bio ? data.bio : '',
      location: data.location ? data.location : '',
      company: data.company ? data.company : '',
    };

    setProfile(profileData);

    setArticles([
      {
        title: '关于如何使用vue开发一个企业级的后台管理系统',
        summary: '好好学习',
        content: '内容',
        time: '2024-02-11',
      },
      {
        title: '关于如何使用vue开发一个企业级的后台管理系统',
        summary: '好好学习',
        content: '内容',
        time: '2024-02-11',
      },
      {
        title: '关于如何使用vue开发一个企业级的后台管理系统',
        summary: '好好学习',
        content: '内容',
        time: '2024-02-11',
      },
    ]);
    console.log(sanitizedConfig.github, '##');
    setLoading(false);
  }, [setLoading]);

  return (
    <HelmetProvider>
      {sanitizedConfig && (
        <HeadTagEditor
          profile={profile}
          theme={theme}
          googleAnalytics={sanitizedConfig.googleAnalytics}
          social={sanitizedConfig.social}
        />
      )}
      <div className="fade-in h-screen">
        {error ? (
          <ErrorPage
            status={`${error.status}`}
            title={error.title}
            subTitle={error.subTitle}
          />
        ) : (
          sanitizedConfig && (
            <Fragment>
              <div className={`p-4 lg:p-10 min-h-full ${bgColor}`}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 rounded-box">
                  <div className="col-span-1">
                    <div className="grid grid-cols-1 gap-6">
                      {!sanitizedConfig.themeConfig.disableSwitch && (
                        <ThemeChanger
                          theme={theme}
                          setTheme={setTheme}
                          loading={loading}
                          themeConfig={sanitizedConfig.themeConfig}
                        />
                      )}
                      <AvatarCard
                        profile={profile}
                        loading={loading}
                        avatarRing={!sanitizedConfig.themeConfig.hideAvatarRing}
                        resume={sanitizedConfig.resume}
                      />
                      <Details
                        profile={profile}
                        loading={loading}
                        github={sanitizedConfig.github}
                        social={sanitizedConfig.social}
                      />
                      <Skill
                        loading={loading}
                        skills={sanitizedConfig.skills}
                      />
                    </div>
                  </div>
                  <div className="lg:col-span-2 col-span-1">
                    <div className="grid grid-cols-1 gap-6">
                      <Project
                        articles={articles}
                        loading={loading}
                        github={sanitizedConfig.github}
                        googleAnalytics={sanitizedConfig.googleAnalytics}
                      />
                      <ExternalProject
                        loading={loading}
                        externalProjects={sanitizedConfig.externalProjects}
                        googleAnalytics={sanitizedConfig.googleAnalytics}
                      />
                      <Blog
                        loading={loading}
                        googleAnalytics={sanitizedConfig.googleAnalytics}
                        blog={sanitizedConfig.blog}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <footer
                className={`p-4 footer ${bgColor} text-base-content footer-center`}
              >
                <div className="card compact bg-base-100 shadow">
                  <Footer content={sanitizedConfig.footer} loading={loading} />
                </div>
              </footer>
            </Fragment>
          )
        )}
      </div>
    </HelmetProvider>
  );
};

export default Home;
