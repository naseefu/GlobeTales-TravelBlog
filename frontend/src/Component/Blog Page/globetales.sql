-- Skip this line as the database already exists
-- CREATE DATABASE globetales;
BEGIN;
-- Connect to the existing database
\c globetales;

-- Table structure for table `user` (create first, as it's referenced by other tables)
DROP TABLE IF EXISTS "user";

CREATE TABLE "user" (
    id BIGSERIAL PRIMARY KEY,
    accept BOOLEAN NOT NULL,
    avatar VARCHAR(255),
    dob DATE,
    email VARCHAR(255),
    firstname VARCHAR(255),
    lastname VARCHAR(255),
    otp VARCHAR(255),
    password VARCHAR(255),
    phonenumber VARCHAR(255),
    role VARCHAR(255),
    verified BOOLEAN NOT NULL
);

-- Insert data into `user`
INSERT INTO
    "user" (
        id,
        accept,
        avatar,
        dob,
        email,
        firstname,
        lastname,
        otp,
        password,
        phonenumber,
        role,
        verified
    )
VALUES (
        1,
        TRUE,
        'https://i.ibb.co/6R5XCVX/m16.jpg',
        '2001-02-28',
        'naseefrahman90@gmail.com',
        'Naseefu',
        'Karumannil',
        '5JIHSJ',
        '$2a$10$lzFesh.7AP0S/He8FuuFqeepwdn/GEVa06zmkaPgQ223Eij6xhI6S',
        '7994529044',
        'USER',
        FALSE
    ),
    (
        2,
        TRUE,
        'https://i.ibb.co/XX0zQ9g/m15.jpg',
        '1995-05-14',
        'john.doe@example.com',
        'John',
        'Doe',
        'Q6T45D',
        '$2a$10$H9h20vcM8rgptmF9YfwZ5VJe3TxOzoFffMPwK4vYp6htINpFwWLnm',
        '1234567890',
        'ADMIN',
        TRUE
    ),
    (
        3,
        FALSE,
        'https://i.ibb.co/Yk3PgfY/m14.jpg',
        '1998-09-10',
        'alice.smith@example.com',
        'Alice',
        'Smith',
        'LN4G78J',
        '$2a$10$1P7tK4lNxIHY7ft6Zn/D4I3gt0n4dTX1zjckQDlXyCBpqOEyACVm.',
        '9876543210',
        'USER',
        TRUE
    );

-- Table structure for table `blog`
DROP TABLE IF EXISTS blog;

CREATE TABLE blog (
    id BIGSERIAL PRIMARY KEY,
    best_time VARCHAR(255),
    content TEXT,
    date DATE,
    duration VARCHAR(255),
    main_image TEXT,
    must_see VARCHAR(255),
    title VARCHAR(255),
    user_id BIGINT,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES "user" (id)
);

-- Insert data into `blog`
INSERT INTO
    "blog" (
        id,
        best_time,
        content,
        date,
        duration,
        main_image,
        must_see,
        title,
        user_id
    )
VALUES 
    (
        3,
        'March–April',
        'Step into a world of tranquility...',
        '2024-11-21',
        '4-5 days',
        'http://res.cloudinary.com/dlmy12woo/image/upload/v1732206840/ultfr2ny8s0mpvowjj51.jpg',
        'Arashiyama Bamboo Grove, Gion District',
        'Discovering the Hidden Charm of Kyoto, Japan',
        1
    ),
    (
        4,
        'June–August',
        'A short drive from Lake Louise...',
        '2024-11-21',
        '3-4 days',
        'http://res.cloudinary.com/dlmy12woo/image/upload/v1732207075/gffsrsgmhblvi2rlha3s.jpg',
        'Bow Falls, Moraine Lake',
        'The Untouched Beauty of Banff, Canada',
        1
    ),
    (
        5,
        'April-June',
        'St. Mark’s Basilica: A masterpiece...',
        '2024-11-21',
        '2-3 days',
        'http://res.cloudinary.com/dlmy12woo/image/upload/v1732207324/gdw8pcdixycp0ppuxmll.jpg',
        'St. Mark’s Basilica, Doge’s Palace',
        'A Romantic Escape to Venice, Italy',
        1
    );

-- Table structure for table `comment`
DROP TABLE IF EXISTS comment;

CREATE TABLE comment (
    id BIGSERIAL PRIMARY KEY,
    comment TEXT,
    date TIMESTAMP(6),
    name VARCHAR(255),
    blog_id BIGINT,
    CONSTRAINT fk_blog FOREIGN KEY (blog_id) REFERENCES blog (id)
);

-- Insert data into `comment`
INSERT INTO
    comment (
        id,
        comment,
        date,
        name,
        blog_id
    )
VALUES (
        2,
        'really wonderfull images',
        '2024-11-21 21:15:58.813154',
        'Xpain',
        1
    ),
    (
        3,
        'Beautiful places',
        '2024-11-21 21:35:40.133120',
        'Nazeef',
        1
    ),
    (
        4,
        'wonderful pictures',
        '2024-11-21 21:36:18.238171',
        'Xpain',
        3
    );

-- Table structure for table `gallery`
DROP TABLE IF EXISTS gallery;

CREATE TABLE gallery (
    album_id BIGINT,
    caption VARCHAR(255),
    url TEXT,
    CONSTRAINT fk_blog_gallery FOREIGN KEY (album_id) REFERENCES blog (id)
);

-- Insert data into `gallery`
INSERT INTO
    gallery (album_id, caption, url)
VALUES (
        1,
        'Fira Village',
        'http://res.cloudinary.com/dlmy12woo/image/upload/v1732206013/atoolk7wrvybgmy9pzcx.jpg'
    ),
    (
        1,
        'Oia Village',
        'http://res.cloudinary.com/dlmy12woo/image/upload/v1732206015/zebcdfrujkmnyu507rgw.jpg'
    ),
    (
        1,
        '',
        'http://res.cloudinary.com/dlmy12woo/image/upload/v1732206017/utgydx9zlcrcytsqhbcm.jpg'
    ),
    (
        3,
        'Train Station Platform in Kyoto',
        'http://res.cloudinary.com/dlmy12woo/image/upload/v1732206854/cvfxfbcutfjn49au3w5w.jpg'
    ),
    (
        3,
        'Food Bar',
        'http://res.cloudinary.com/dlmy12woo/image/upload/v1732206868/qqbcofae9sbab8hlesxo.jpg'
    );

-- Commit the changes
COMMIT;
-- Final table structure for the `user` table
-- Structure and initial data insertion for blog, comment, gallery, and user completed
-- The `user` table holds user-specific details such as role, avatar, password, OTP for verification, and status of the user.
-- The `blog` table stores details about each blog entry, such as the title, content, images, best travel time, duration, and user references.
-- The `comment` table tracks comments made on blogs, with references to the `blog` table through the blog_id.
-- The `gallery` table stores images linked to specific blogs, capturing the URL and captions.

-- Committing the changes
COMMIT;