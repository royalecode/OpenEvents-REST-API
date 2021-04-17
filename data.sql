CREATE DATABASE openEvents;
USE openEvents;

CREATE TABLE user(
	id int() AUTO_INCREMENT,
	image varchar(100),
	name varchar(50) NOT NULL,
	last_name varchar(50) NOT NULL,
	email varchar(50) NOT NULL,
	password varchar(50) NOT NULL,
	CONSTRAINT email_unic UNIQUE (email),
	CONSTRAINT pk_user PRIMARY KEY (id)
);

CREATE TABLE event(
	id int() AUTO_INCREMENT,
	name varchar(50) NOT NULL,
	owner_id int() NOT NULL,
	create_date date NOT NULL,
	image varchar(200),
	location varchar(200) NOT NULL,
	description varchar(250),
	eventStart_date date NOT NULL,
	eventEnd_date date NOT NULL,
	n_participators int() NOT NULL,
	type varCHar(50) NOT NULL,
	CONSTRAINT pk_event PRIMARY KEY (id),
	CONSTRAINT fk_owner FOREIGN KEY (owner_id) REFERENCES user (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE assistance(
	user_id int() NOT NULL,
	event_id int() NOT NULL,
	puntuation int(),
	comentary varchar(100),
	CONSTRAINT pk_assist PRIMARY KEY (user_id, event_id),
	CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT fk_event FOREIGN KEY (event_id) REFERENCES event (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE friend(
	user_id int(),
	user_id_friend int(),
	status boolean NOT NULL,
	CONSTRAINT pk_friend PRIMARY KEY (user_id, user_id_friend),
	CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT fk_user_friend FOREIGN KEY (user_id_friend) REFERENCES user (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE message(
	id int() AUTO_INCREMENT,
	content varchar(350) NOT NULL,
	user_id_send int(),
	user_id_recived int(),
	ts TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
	CONSTRAINT pk_message PRIMARY KEY (user_id_send, user_id_recived),
	CONSTRAINT fk_user_send FOREIGN KEY (user_id_send) REFERENCES user (id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT fk_user_recived FOREIGN KEY (user_id_recived) REFERENCES user (id) ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE users(
	id int(20) AUTO_INCREMENT,
	image varchar(100),
	name varchar(50) NOT NULL,
	last_name varchar(50) NOT NULL,
	email varchar(50) NOT NULL,
	password varchar(50) NOT NULL,
	CONSTRAINT email_unic UNIQUE (email),
	CONSTRAINT pk_user PRIMARY KEY (id)
);

CREATE TABLE events(
	id int(20) AUTO_INCREMENT,
	name varchar(50) NOT NULL,
	owner_id int(20) NOT NULL,
	create_date date NOT NULL,
	image varchar(200),
	location varchar(200) NOT NULL,
	description varchar(250),
	eventStart_date date NOT NULL,
	eventEnd_date date NOT NULL,
	n_participators int(20) NOT NULL,
	type varCHar(50) NOT NULL,
	CONSTRAINT pk_event PRIMARY KEY (id),
	CONSTRAINT fk_owner FOREIGN KEY (owner_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE assistance(
	user_id int(20) NOT NULL,
	event_id int(20) NOT NULL,
	puntuation int(2),
	comentary varchar(100),
	CONSTRAINT pk_assist PRIMARY KEY (user_id, event_id),
	CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT fk_event FOREIGN KEY (event_id) REFERENCES events (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE friend(
	user_id int(20),
	user_id_friend int(20),
	status boolean NOT NULL,
	CONSTRAINT pk_friend PRIMARY KEY (user_id, user_id_friend),
	CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT fk_user_friend FOREIGN KEY (user_id_friend) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE message(
	id int(20) AUTO_INCREMENT,
	content varchar(350) NOT NULL,
	user_id_send int(20),
	user_id_recived int(20),
	ts TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
	CONSTRAINT pk_message PRIMARY KEY (user_id_send, user_id_recived),
	CONSTRAINT fk_user_send FOREIGN KEY (user_id_send) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT fk_user_recived FOREIGN KEY (user_id_recived) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE
);