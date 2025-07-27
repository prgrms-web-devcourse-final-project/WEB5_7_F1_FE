import {Outlet, useLocation, NavLink, useNavigate} from "react-router-dom";
import {Button, Image, Nav, Stack} from "react-bootstrap";
import mainLogoRect from "../../assets/images/main-logo-rect.png";
import styles from "./Layout.module.scss"
import axios from "axios";
import {useApiQuery} from "../../hooks/useApiQuery";
import {useApiMutation} from "../../hooks/useApiMutation";
import {useSetRecoilState} from "recoil";
import {loginUserAtom} from "../../state/atoms";
import {useEffect} from "react";

const authMeRequest = async () => {
    const response = await axios.get(`/auth/me`);
    return response.data;
};

const logoutRequest = async () => {
    await axios.post(`/logout`);
}


const Layout = () => {
    const location = useLocation();
    const path = location.pathname;
    const navigate = useNavigate();
    const isActive = (target) => path.startsWith(target);
    const setLoginUser = useSetRecoilState(loginUserAtom);

    const f1Styles = {
        header: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            backgroundColor: '#15151e',
            borderBottom: '3px solid #e10600',
            zIndex: 1000,
            padding: '1rem 0',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
        },
        headerContainer: {
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '0 2rem'
        },
        logo: {
            height: '60px',
            width: 'auto',
            objectFit: 'contain'
        },
        userSection: {
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
        },
        userBadge: {
            backgroundColor: '#e10600',
            color: '#ffffff',
            padding: '0.5rem 1rem',
            borderRadius: '20px',
            fontSize: '0.85rem',
            fontWeight: '600',
            border: 'none',
            textTransform: 'uppercase'
        },
        nav: {
            display: 'flex',
            alignItems: 'center',
            gap: '2rem'
        },
        navLink: {
            color: '#ffffff',
            textDecoration: 'none',
            fontSize: '0.9rem',
            fontWeight: '500',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            transition: 'all 0.2s ease',
            position: 'relative'
        },
        navLinkActive: {
            color: '#e10600',
            backgroundColor: 'rgba(225, 6, 0, 0.1)',
            fontWeight: '600'
        },
        navLinkHover: {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            transform: 'translateY(-2px)'
        },
        logoutButton: {
            backgroundColor: 'transparent',
            border: '1px solid #38384a',
            color: '#ffffff',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            fontSize: '0.85rem',
            fontWeight: '500',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            transition: 'all 0.2s ease',
            cursor: 'pointer'
        },
        mainContent: {
            marginTop: '100px', // 헤더 높이만큼 여백
            backgroundColor: '#f6f2ef',
            minHeight: 'calc(100vh - 100px)',
            color: '#ffffff'
        },
        contentContainer: {
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '2rem'
        },
        contentCard: {
            backgroundColor: '#f6f2ef',
            // border: '1px solid #38384a',
            borderRadius: '8px',
            padding: '2rem',
            minHeight: '600px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
        }
    };

    const { isLoading, data } = useApiQuery(
        ["authme"],
        () => authMeRequest(),
    );

    useEffect(() => {
        if (data) {
            setLoginUser(data);
        }
    }, [data])

    const { mutate: logoutMutate } = useApiMutation(logoutRequest, {
        onSuccess: () => {
            navigate("/login");
        },
    });

    return (
        <>
            {/* Fixed Header */}
            <header style={f1Styles.header}>
                <div style={f1Styles.headerContainer}>
                    <div className="d-flex justify-content-between align-items-center">
                        {/* Logo */}
                        <div>
                            <img 
                                src={mainLogoRect} 
                                alt="Logo" 
                                style={f1Styles.logo}
                            />
                        </div>

                        {/* Navigation & User Section */}
                        <div className="d-flex align-items-center gap-4">
                            {/* User Badge */}
                            <div style={f1Styles.userBadge}>
                                {data?.name}님
                            </div>

                            {/* Navigation */}
                            <nav style={f1Styles.nav}>
                                <NavLink 
                                    to="/quiz" 
                                    style={({isActive}) => ({
                                        ...f1Styles.navLink,
                                        ...(isActive ? f1Styles.navLinkActive : {})
                                    })}
                                    onMouseEnter={(e) => {
                                        if (!isActive('/quiz')) {
                                            Object.assign(e.target.style, f1Styles.navLinkHover);
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isActive('/quiz')) {
                                            e.target.style.backgroundColor = 'transparent';
                                            e.target.style.transform = 'translateY(0)';
                                        }
                                    }}
                                >
                                    Quiz
                                </NavLink>

                                {data && data.role === 'ROLE_USER' && <NavLink
                                    to="/room"
                                    style={({isActive}) => ({
                                        ...f1Styles.navLink,
                                        ...(isActive ? f1Styles.navLinkActive
                                            : {})
                                    })}
                                    onMouseEnter={(e) => {
                                        if (!isActive('/room')) {
                                            Object.assign(e.target.style,
                                                f1Styles.navLinkHover);
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isActive('/room')) {
                                            e.target.style.backgroundColor = 'transparent';
                                            e.target.style.transform = 'translateY(0)';
                                        }
                                    }}
                                >
                                    게임하기
                                </NavLink>}

                                <NavLink 
                                    to="/rank" 
                                    style={({isActive}) => ({
                                        ...f1Styles.navLink,
                                        ...(isActive ? f1Styles.navLinkActive : {})
                                    })}
                                    onMouseEnter={(e) => {
                                        if (!isActive('/rank')) {
                                            Object.assign(e.target.style, f1Styles.navLinkHover);
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isActive('/rank')) {
                                            e.target.style.backgroundColor = 'transparent';
                                            e.target.style.transform = 'translateY(0)';
                                        }
                                    }}
                                >
                                    전체 랭킹
                                </NavLink>

                                {data && data.role === 'ROLE_USER' &&<NavLink
                                    to="/mypage"
                                    style={({isActive}) => ({
                                        ...f1Styles.navLink,
                                        ...(isActive ? f1Styles.navLinkActive
                                            : {})
                                    })}
                                    onMouseEnter={(e) => {
                                        if (!isActive('/mypage')) {
                                            Object.assign(e.target.style,
                                                f1Styles.navLinkHover);
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isActive('/mypage')) {
                                            e.target.style.backgroundColor = 'transparent';
                                            e.target.style.transform = 'translateY(0)';
                                        }
                                    }}
                                >
                                    마이페이지
                                </NavLink>}

                                {data && data.role === 'ROLE_ADMIN' &&<NavLink
                                    to="/users"
                                    style={({isActive}) => ({
                                        ...f1Styles.navLink,
                                        ...(isActive ? f1Styles.navLinkActive
                                            : {})
                                    })}
                                    onMouseEnter={(e) => {
                                        if (!isActive('/users')) {
                                            Object.assign(e.target.style,
                                                f1Styles.navLinkHover);
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isActive('/users')) {
                                            e.target.style.backgroundColor = 'transparent';
                                            e.target.style.transform = 'translateY(0)';
                                        }
                                    }}
                                >
                                    관리자 메뉴
                                </NavLink>}

                                <button
                                    style={f1Styles.logoutButton}
                                    onClick={() => logoutMutate()}
                                    onMouseEnter={(e) => {
                                        e.target.style.backgroundColor = '#38384a';
                                        e.target.style.borderColor = '#e10600';
                                        e.target.style.transform = 'translateY(-2px)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.backgroundColor = 'transparent';
                                        e.target.style.borderColor = '#38384a';
                                        e.target.style.transform = 'translateY(0)';
                                    }}
                                >
                                    로그아웃
                                </button>
                            </nav>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main style={f1Styles.mainContent}>
                <div style={f1Styles.contentContainer}>
                    <div style={f1Styles.contentCard}>
                        <Outlet />
                    </div>
                </div>
            </main>
        </>
    );
};

export default Layout;