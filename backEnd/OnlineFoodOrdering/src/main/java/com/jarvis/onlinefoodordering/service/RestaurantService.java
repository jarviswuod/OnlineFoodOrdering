package com.jarvis.onlinefoodordering.service;

import com.jarvis.onlinefoodordering.dto.RestaurantDto;
import com.jarvis.onlinefoodordering.model.Address;
import com.jarvis.onlinefoodordering.model.Restaurant;
import com.jarvis.onlinefoodordering.model.User;
import com.jarvis.onlinefoodordering.repository.AddressRepository;
import com.jarvis.onlinefoodordering.repository.RestaurantRepository;
import com.jarvis.onlinefoodordering.repository.UserRepository;
import com.jarvis.onlinefoodordering.request.CreateRestaurantRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class RestaurantService {
    private final RestaurantRepository restaurantRepository;
    private final AddressRepository addressRepository;
    private final UserRepository userRepository;

    public RestaurantService(RestaurantRepository restaurantRepository, AddressRepository addressRepository, UserRepository userRepository) {
        this.restaurantRepository = restaurantRepository;
        this.addressRepository = addressRepository;
        this.userRepository = userRepository;
    }


    public Restaurant createRestaurant(CreateRestaurantRequest req, User user) {
        Address address = addressRepository.save(req.getAddress());

        Restaurant restaurant = new Restaurant();
        restaurant.setAddress(address);
        restaurant.setContactInformation(req.getContactInformation());
        restaurant.setCuisineType(req.getCuisineType());
        restaurant.setDescription(req.getDescription());
        restaurant.setImages(req.getImages());
        restaurant.setName(req.getName());
        restaurant.setOpeningHours(req.getOpeningHours());
        restaurant.setRegistrationDate(LocalDateTime.now());
        restaurant.setOwner(user);

        return restaurantRepository.save(restaurant);
    }


    public Restaurant updateRestaurant(Long restaurantId, CreateRestaurantRequest updateRequest) throws Exception {
        Restaurant restaurant = findRestaurantById(restaurantId);
        if (restaurant.getCuisineType() != null) {
            restaurant.setCuisineType(updateRequest.getCuisineType());
        }
        if (restaurant.getDescription() != null) {
            restaurant.setDescription(updateRequest.getDescription());
        }
        if (restaurant.getImages() != null) {
            restaurant.setImages(updateRequest.getImages());
        }
        if (restaurant.getName() != null) {
            restaurant.setName(updateRequest.getName());
        }
        if (restaurant.getOpeningHours() != null) {
            restaurant.setOpeningHours(updateRequest.getOpeningHours());
        }


        return restaurantRepository.save(restaurant);
    }

    public void deleteRestaurant(Long restaurantId) throws Exception {
        Restaurant restaurant = findRestaurantById(restaurantId);
        restaurantRepository.delete(restaurant);
    }

    public List<Restaurant> getAllRestaurants() {
        return restaurantRepository.findAll();
    }

    public List<Restaurant> searchRestaurants(String keyword) {
        return restaurantRepository.findBySearchQuery(keyword);
    }

    public Restaurant findRestaurantById(Long restaurantId) throws Exception {
        Optional<Restaurant> opt = restaurantRepository.findById(restaurantId);
        if (opt.isEmpty()) {
            throw new Exception("Restaurant not found with id " + restaurantId);
        }

        return opt.get();
    }

    public Restaurant getRestaurantByUserId(Long userId) throws Exception {
        Restaurant restaurant = restaurantRepository.findByOwnerId(userId);
        if (restaurant == null) {
            throw new Exception("Restaurant not found with owner id " + userId);
        }
        return restaurant;
    }

    public RestaurantDto addToFavourites(Long restaurantId, User user) throws Exception {
        Restaurant restaurant = findRestaurantById(restaurantId);

        RestaurantDto dto = new RestaurantDto();
        dto.setDescription(restaurant.getDescription());
        dto.setImages(restaurant.getImages());
        dto.setTitle(restaurant.getName());
        dto.setId(restaurantId);

        boolean isFavourite = false;
        List<RestaurantDto> favorites = user.getFavorites();
        for (RestaurantDto fav : favorites) {
            if (fav.getId().equals(restaurantId)) {
                isFavourite = true;
                break;
            }
        }

        if (isFavourite)
            favorites.removeIf(favorite -> favorite.getId().equals(restaurantId));
        else
            favorites.add(dto);

        userRepository.save(user);
        return dto;
    }

    public Restaurant updateRestaurantStatus(Long restaurantId) throws Exception {
        Restaurant restaurant = findRestaurantById(restaurantId);
        restaurant.setOpen(!restaurant.isOpen());
        return restaurantRepository.save(restaurant);
    }
}
