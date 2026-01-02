create table
    players (
        id integer not null constraint players_pk primary key autoincrement constraint players_pk_2 unique,
        createdAt DATETIME default CURRENT_TIMESTAMP not null,
        
        name varchar not null constraint players_pk_3 unique,
        password varchar not null,
        balance float default 1000 not null
    )