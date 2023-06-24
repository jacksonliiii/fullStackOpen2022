CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes integer DEFAULT 0
);
insert into blogs (author, url, title)
values ('James Mack', 'www.poo.com', 'Bowel Movements');
insert into blogs (author, url, title)
values ('James Mack', 'www.pee.com', 'Urinal Ethics');