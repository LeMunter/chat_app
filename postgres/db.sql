--
-- PostgreSQL database dump
--

-- Dumped from database version 14.1 (Debian 14.1-1.pgdg110+1)
-- Dumped by pg_dump version 14.1 (Debian 14.1-1.pgdg110+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: chatapp; Type: DATABASE; Schema: -; Owner: postgres 
--

ALTER DATABASE chatapp OWNER TO postgres;

\connect chatapp

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: conversation; Type: TABLE; Schema: public; Owner: postgres
--

-- CREATE TABLE public.conversation (
--     id integer NOT NULL,
--     user_ids integer[]
-- );


-- ALTER TABLE public.conversation OWNER TO postgres;

--
-- Name: conversation_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

/* CREATE SEQUENCE public.conversation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1; */


/* ALTER TABLE public.conversation_id_seq OWNER TO postgres; */

--
-- Name: chatroom_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

/* ALTER SEQUENCE public.conversation_id_seq OWNED BY public.conversation.id; */

--
-- Name: chatroom; Type: TABLE; Schema: public; Owner: postgres
--

/* CREATE TABLE public.chatroom (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    is_public boolean NOT NULL,
    tag text[] NOT NULL,
    user_ids integer[]
); */


/* ALTER TABLE public.chatroom OWNER TO postgres; */

--
-- Name: chatroom_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

/* CREATE SEQUENCE public.chatroom_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.chatroom_id_seq OWNER TO postgres; */

--
-- Name: chatroom_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

-- ALTER SEQUENCE public.chatroom_id_seq OWNED BY public.chatroom.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

/* CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    active boolean NOT NULL,
    role character varying(255) NOT NULL
); */


/* ALTER TABLE public.users OWNER TO postgres; */

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

/* CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres; */

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

/* ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id; */


--
-- Name: chatroom id; Type: DEFAULT; Schema: public; Owner: postgres
--

/* ALTER TABLE ONLY public.chatroom ALTER COLUMN id SET DEFAULT nextval('public.chatroom_id_seq'::regclass);
 */
--
-- Name: conversation id; Type: DEFAULT; Schema: public; Owner: postgres
--

/* ALTER TABLE ONLY public.conversation ALTER COLUMN id SET DEFAULT nextval('public.conversation_id_seq'::regclass); */


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

/* ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass); */


--
-- Data for Name: chatroom; Type: TABLE DATA; Schema: public; Owner: postgres
--

/* COPY public.chatroom (id, name, is_public, tag, user_ids) FROM stdin;
\.
 */
--
-- Data for Name: conversation; Type: TABLE DATA; Schema: public; Owner: postgres
--

-- COPY public.conversation (id, user_ids) FROM stdin;
-- \.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

-- COPY public.users (id, username, password, active, role) FROM stdin;
-- 12	useradmin	$2a$10$g9MB3Phm0NtPDkRIiUGNHuX6xxuiK3Cq.IraE4K9.XJ3CcLVEwTKi	t	admin
-- 13	user	$2a$10$1u6KQFt0POPwclrIY90u0.yIKTtahVJHpANmDSfw0NtFyuO0id2.a	t	user
-- \.


--
-- Name: chatroom_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

-- SELECT pg_catalog.setval('public.chatroom_id_seq', 1, false);

--
-- Name: conversation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

-- SELECT pg_catalog.setval('public.conversation_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

-- SELECT pg_catalog.setval('public.users_id_seq', 13, true);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

-- ALTER TABLE ONLY public.users
--     ADD CONSTRAINT users_pkey PRIMARY KEY (id);

--
-- Name: chatroom chatroom_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

-- ALTER TABLE ONLY public.chatroom
--     ADD CONSTRAINT chatroom_pkey PRIMARY KEY (id);

--
-- Name: conversation conversation_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

-- ALTER TABLE ONLY public.conversation
--     ADD CONSTRAINT conversation_pkey PRIMARY KEY (id);


--
-- Name: message; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.message (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    message character varying(255) NOT NULL,
    user_id integer,
    room_id integer
);


-- ALTER TABLE public.message OWNER TO postgres;

--
-- Name: messages_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

-- CREATE SEQUENCE public.message_id_seq
--     AS integer
--     START WITH 1
--     INCREMENT BY 1
--     NO MINVALUE
--     NO MAXVALUE
--     CACHE 1;


-- ALTER TABLE public.message_id_seq OWNER TO postgres;

--
-- Name: messages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

-- ALTER SEQUENCE public.message_id_seq OWNED BY public.message.id;

--
-- Name: message id; Type: DEFAULT; Schema: public; Owner: postgres
--

-- ALTER TABLE ONLY public.message ALTER COLUMN id SET DEFAULT nextval('public.message_id_seq'::regclass);

--
-- Data for Name: message; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.message (id, username, message, user_id, room_id) FROM stdin;
\.

--
-- Name: message_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

-- SELECT pg_catalog.setval('public.message_id_seq', 1, false);

--
-- Name: message message_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

-- ALTER TABLE ONLY public.message
--     ADD CONSTRAINT message_pkey PRIMARY KEY (id);
    --ADD CONSTRAINT message_fkey FOREIGN KEY (foreign_id) REFERENCES public.conversation (id);


--
-- PostgreSQL database dump complete
--

