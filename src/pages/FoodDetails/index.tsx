import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useLayoutEffect,
} from 'react';
import { Image } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import formatValue from '../../utils/formatValue';

import api from '../../services/api';

import {
  Container,
  Header,
  ScrollContainer,
  FoodsContainer,
  Food,
  FoodImageContainer,
  FoodContent,
  FoodTitle,
  FoodDescription,
  FoodPricing,
  AdditionalsContainer,
  Title,
  TotalContainer,
  AdittionalItem,
  AdittionalItemText,
  AdittionalQuantity,
  PriceButtonContainer,
  TotalPrice,
  QuantityContainer,
  FinishOrderButton,
  ButtonText,
  IconContainer,
} from './styles';

interface Params {
  id: number;
}

interface Extra {
  id: number;
  name: string;
  value: number;
  quantity: number;
}

interface Food {
  id: number;
  name: string;
  description: string;
  price: number;
  category: number;
  thumbnail_url: string;
  image_url: string;
  formattedPrice: string;
  extras: Extra[];
}

const FoodDetails: React.FC = () => {
  const [food, setFood] = useState({} as Food);
  const [extras, setExtras] = useState<Extra[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [foodQuantity, setFoodQuantity] = useState(1);
  const [favoriteFoods, setFavoriteFoods] = useState<Food[]>([]);

  const navigation = useNavigation();
  const route = useRoute();

  const routeParams = route.params as Params;

  useEffect(() => {
    async function loadFood(): Promise<void> {
      const foodId = routeParams.id;

      const response = await api.get<Food>(`/foods/${foodId}`);

      const loadedFood = response.data;

      const foodWithFormattedPrice = {
        ...loadedFood,
        formattedPrice: formatValue(loadedFood.price),
      };

      setFood(foodWithFormattedPrice);

      const foodExtras = loadedFood.extras;

      const extrasWithQuantity = foodExtras.map(foodExtra => ({
        ...foodExtra,
        quantity: 0,
      }));

      setExtras(extrasWithQuantity);
    }

    loadFood();
  }, [routeParams.id]);

  useEffect(() => {
    async function loadFavorites(): Promise<void> {
      const response = await api.get<FavoriteFood[]>('/favorites');

      const favorites = response.data;

      setFavoriteFoods(favorites);

      const foodId = routeParams.id;

      const favoriteFood = favorites.filter(favorite => favorite.id === foodId);

      setIsFavorite(favoriteFood.length > 0);
    }

    loadFavorites();
  }, [routeParams.id]);

  function handleIncrementExtra(id: number): void {
    const incrementedExtras = extras.map(extra =>
      extra.id === id ? { ...extra, quantity: extra.quantity + 1 } : extra,
    );

    setExtras(incrementedExtras);
  }

  function handleDecrementExtra(id: number): void {
    const decrementedExtras = extras.map(extra =>
      extra.id === id
        ? {
          ...extra,
          quantity: extra.quantity > 0 ? extra.quantity - 1 : extra.quantity,
        }
        : extra,
    );

    setExtras(decrementedExtras);
  }

  function handleIncrementFood(): void {
    setFoodQuantity(foodQuantity + 1);
  }

  function handleDecrementFood(): void {
    const quantity = foodQuantity > 1 ? foodQuantity - 1 : foodQuantity;
    setFoodQuantity(quantity);
  }

  const toggleFavorite = useCallback(async () => {
    setIsFavorite(!isFavorite);

    let favorites;

    if (!isFavorite) {
      const newFavorite = food as FavoriteFood;

      favorites = [...favoriteFoods, newFavorite];

      setFavoriteFoods(favorites);

      await api.post('/favorites', newFavorite);
      return;
    }

    favorites = favoriteFoods.filter(favorite => favorite.id !== food.id);

    setFavoriteFoods(favorites);

    await api.delete(`/favorites/${food.id}`);
  }, [isFavorite, food, favoriteFoods]);

  const cartTotal = useMemo(() => {
    const foodPrice = food.price;
    const subtotal = foodPrice * foodQuantity;

    const extrasTotal = extras.reduce((total, extra) => {
      return total + extra.quantity * extra.value;
    }, 0);

    const total = subtotal + extrasTotal;

    return formatValue(total);
  }, [extras, food, foodQuantity]);

  async function handleFinishOrder(): Promise<void> {
    // Finish the order and save on the API
  }

  // Calculate the correct icon name
  const favoriteIconName = useMemo(
    () => (isFavorite ? 'favorite' : 'favorite-border'),
    [isFavorite],
  );

  useLayoutEffect(() => {
    // Add the favorite icon on the right of the header bar
    navigation.setOptions({
      headerRight: () => (
        <MaterialIcon
          name={favoriteIconName}
          size={24}
          color="#FFB84D"
          onPress={() => toggleFavorite()}
        />
      ),
    });
  }, [navigation, favoriteIconName, toggleFavorite]);

  return (
    <Container>
      <Header />

      <ScrollContainer>
        <FoodsContainer>
          <Food>
            <FoodImageContainer>
              <Image
                style={{ width: 327, height: 183 }}
                source={{
                  uri: food.image_url,
                }}
              />
            </FoodImageContainer>
            <FoodContent>
              <FoodTitle>{food.name}</FoodTitle>
              <FoodDescription>{food.description}</FoodDescription>
              <FoodPricing>{food.formattedPrice}</FoodPricing>
            </FoodContent>
          </Food>
        </FoodsContainer>
        <AdditionalsContainer>
          <Title>Adicionais</Title>
          {extras.map(extra => (
            <AdittionalItem key={extra.id}>
              <AdittionalItemText>{extra.name}</AdittionalItemText>
              <AdittionalQuantity>
                <Icon
                  size={15}
                  color="#6C6C80"
                  name="minus"
                  onPress={() => handleDecrementExtra(extra.id)}
                  testID={`decrement-extra-${extra.id}`}
                />
                <AdittionalItemText testID={`extra-quantity-${extra.id}`}>
                  {extra.quantity}
                </AdittionalItemText>
                <Icon
                  size={15}
                  color="#6C6C80"
                  name="plus"
                  onPress={() => handleIncrementExtra(extra.id)}
                  testID={`increment-extra-${extra.id}`}
                />
              </AdittionalQuantity>
            </AdittionalItem>
          ))}
        </AdditionalsContainer>
        <TotalContainer>
          <Title>Total do pedido</Title>
          <PriceButtonContainer>
            <TotalPrice testID="cart-total">{cartTotal}</TotalPrice>
            <QuantityContainer>
              <Icon
                size={15}
                color="#6C6C80"
                name="minus"
                onPress={handleDecrementFood}
                testID="decrement-food"
              />
              <AdittionalItemText testID="food-quantity">
                {foodQuantity}
              </AdittionalItemText>
              <Icon
                size={15}
                color="#6C6C80"
                name="plus"
                onPress={handleIncrementFood}
                testID="increment-food"
              />
            </QuantityContainer>
          </PriceButtonContainer>

          <FinishOrderButton onPress={() => handleFinishOrder()}>
            <ButtonText>Confirmar pedido</ButtonText>
            <IconContainer>
              <Icon name="check-square" size={24} color="#fff" />
            </IconContainer>
          </FinishOrderButton>
        </TotalContainer>
      </ScrollContainer>
    </Container>
  );
};

export default FoodDetails;
