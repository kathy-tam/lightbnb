INSERT INTO users (name, email, password)
VALUES ('Eva Stanley', 'evastanley@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
('Etta WEst', 'ettawest@yahoo.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
('Dominic Parks', 'dominicparks@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u');

INSERT INTO properties(owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES (1, 'Beach House', 'description', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg', 930.61, 3, 4, 4, 'Canada', '536 Namsub Highway', 'Vancouver', 'British Columbia', '28142', true),
(2, 'Cottage', 'description', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg', 500.00, 2, 3, 5, 'Canada', '84 Danforth Avenue', 'Toronto', 'Ontario', 'M1M 4R6', true),
(3, 'Luxury Apartment', 'description', 'https://images.pexels.com/photos/2080018/pexels-photo-2080018.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2080018/pexels-photo-2080018.jpeg', 1100.00, 1, 2, 2, 'Canada', '1505 Clark Street', 'Montreal', 'Quebec', 'H2X 3L3', true);

INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES ('2021-07-21', '2021-07-27', 2, 1),
('2021-08-01', '2021-09-27', 1, 2),
('2021-08-04', '2021-08-18', 2, 3);

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (1, 2, 1, 5, 'Wondeful cottage by the lake'),
(2, 1, 2, 3, 'Beach house could be cleaner'),
(3, 2, 3, 4, 'Cottage was clean and owners friendly');