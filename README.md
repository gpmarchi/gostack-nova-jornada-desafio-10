<h3 align="center">
  Desafio 10: GoRestaurant Mobile
</h3>

## :rocket: Sobre o desafio

Nesse desafio foi desenvolvido o app GoRestaurant, dessa vez a versão mobile para o cliente. Neste projeto foram utilizados os aprendizados adquiridos em React Native junto com TypeScript para criar um pequeno app para pedidos de comida.

Essa é uma aplicação que se conecta a uma Fake API, exibe e filtra os pratos de comida da API e permite a criação de novos pedidos.

## Utilizando a fake API

Para que se tenha os dados para exibir em tela, existe um arquivo na raiz do projeto que é utilizado como uma fake API para prover esses dados. Esses dados podem ser encontrados no arquivo ```server.json```.

Para isso foi utilizada uma dependência chamada ```json-server``` que faz uso do arquivo ```server.json``` simulando o comportamento de uma API real, e provê os dados através das seguintes rotas:

```/foods```: Retorna todas as comidas cadastradas na API

```/foods/:id```: Retorna um prato de comida cadastradas na API baseado no seu ```id```

```/categories```: Retorna todas as catedorias cadastradas na API

```/orders```: Retorna todos os pedidos que foram cadastrados na API

```/favorites```: Retorna todas as comidas favoritas que foram cadastradas na API

Para rodar esse servidor é necessário executar o seguinte comando:

```bash
yarn json-server server.json -p 3333
```

## Instalação

Para instalar o projeto localmente na sua máquina basta clonar o repositório:

```bash
git clone https://github.com/gpmarchi/gostack-nova-jornada-desafio-10.git && cd gostack-nova-jornada-desafio-10
```

E rodar o comando abaixo para instalar as dependências necessárias:

```bash
yarn
```

## Funcionalidades da aplicação

Abaixo estão as funcionalidades principais da aplicação:

- **`Listar os pratos de comida da API`**: A página ```Dashboard``` exibe uma listagem com os campos ```name```, ```value``` e ```description``` de todos os pratos de comida que estão cadastrados na API.

- **`Listar as categorias da API`**: Na página ```Dashboard``` é exibida uma listagem com os campos ```title``` e ```image_url``` de todas as categorias que estão cadastradas na API.

- **`Filtrar pratos de comida por busca ou por categorias`**: Na página ```Dashboard``` é possível utilizar um input ou os botões das categorias para fazer uma busca na API.

- **`Listar os pedidos da API`**: Na página ```Orders``` é exibida uma listagem com dados dos produtos pedidos, através dos campos ```name``` e ```description``` de todos os pedidos que estão cadastrados na API.

- **`Listar os pratos favoritos da API`**: Na página ```Favorites``` é exibida uma listagem com dados dos produtos favoritos, através dos campos ```name``` e ```description``` de todos os pedidos que estão cadastrados na API.

- **`Realizar um pedido`**: Na página ```Dashboard``` ao se clicar em um item o usuário é redirecionado para a página ```FoodDetails```, onde é possível realizar um novo pedido controlando a quantidade desse item no pedido e também com a possibilidade de adicionar ingredientes extras. Todo o valor do pedido é calculado de acordo com as quantidades pedidas.

## Especificação dos testes

O desafio foi resolvido seguindo a técnica de TDD. Os testes podem ser encontrados na pasta ```src/__tests__``` e para executá-los rodar o comando:

```bash
yarn test
```

Para cada teste existe uma breve descrição do que a aplicação executa para que o mesmo passe:

- **`should be able to list the food plates`**: Para que esse teste passe, a aplicação permite que sejam listados no ```Dashboard``` todos os pratos de comida que são retornados da fake API.

- **`should be able to list the food plates filtered by category`**: Para que esse teste passe, a aplicação permite que sejam listados no ```Dashboard``` os pratos de comida filtrados pelas categoria presentes na API.

- **`should be able to list the food plates filtered by name search`**: Para que esse teste passe, a aplicação permite que sejam listados no ```Dashboard``` os pratos de comida filtrados pelos nomes cadastrados na API.

- **`should be able to navigate to the food details page`**: Para que esse teste passe, dentro do ```Dashboard``` é permitido que ao se clicar em um item o usuário seja navegado para a página ```FoodDetails``` passando como parâmetro de navegação o id do item clicado.

- **`should be able to list the favorite food plates`**: Para que esse teste passe, a aplicação permite que sejam listados na página ```Favorites``` todos os pratos de comida que estão salvos na rota ```favorites```.

- **`should be able to list the orders`**: Para que esse teste passe, a aplicação permite que sejam listados na página ```Orders``` todos os pratos de comida que estão salvos na rota ```orders```.

- **`should be able to list  the food`**: Para que esse teste passe, a aplicação permite que sejam listados todos os dados de uma comida específica na página ```FoodDetails```, baseado no id recuperado através dos parâmetros da rota.

- **`should be able to increment food quantity`**: Para que esse teste passe, a aplicação permite que seja incrementada em 1 a quantidade do item na página ```FoodDetails```.

- **`should be able to decrement food quantity`**: Para que esse teste passe, a aplicação permite que seja decrementada em 1 a quantidade do item na página ```FoodDetails```.

- **`should not be able to decrement food quantity below 1 unit`**: Para que esse teste passe, a aplicação deve impedir que seja decrementada a quantidade dos itens para um valor menor que 1, devendo ser o número mínimo de itens no pedido de 1 unidade.

- **`should be able to increment an extra item quantity`**: Para que esse teste passe, a aplicação deve permitir que seja incrementada em 1 a quantidade de um ingrediente extra na página ```FoodDetails``` baseado no seu id.

- **`should be able to decrement an extra item quantity`**: Para que esse teste passe, a aplicação deve permitir que seja decrementada em 1 a quantidade de um ingrediente extra na página ```FoodDetails``` baseado no seu id.
