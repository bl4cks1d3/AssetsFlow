### Funções Públicas e Externas

1. **registerAsset**
   - **Entradas:** `string memory _description, string memory _currentLocation, uint256 _value, uint256 _categoryId`
   - **Retorno:** Não retorna valores (`void`).
   - **Descrição:** Registra um novo ativo, atribuindo-o a uma categoria existente e mapeando seus detalhes.

2. **updateAssetDescription**
   - **Entradas:** `uint256 _id, string memory _newDescription`
   - **Retorno:** Não retorna valores (`void`).
   - **Descrição:** Atualiza a descrição de um ativo específico.

3. **updateMaintenanceStatus**
   - **Entradas:** `uint256 _id, bool _inMaintenance`
   - **Retorno:** Não retorna valores (`void`).
   - **Descrição:** Atualiza o status de manutenção de um ativo para ativo ou em manutenção.

4. **updateCategoryName**
   - **Entradas:** `uint256 _categoryId, string memory _newName`
   - **Retorno:** Não retorna valores (`void`).
   - **Descrição:** Atualiza o nome de uma categoria existente.

5. **updateCategoryDescription**
   - **Entradas:** `uint256 _categoryId, string memory _newDescription`
   - **Retorno:** Não retorna valores (`void`).
   - **Descrição:** Atualiza a descrição de uma categoria existente.

6. **setContractOwner**
   - **Entradas:** `address _newOwner`
   - **Retorno:** Não retorna valores (`void`).
   - **Descrição:** Transfere a propriedade do contrato para um novo dono.

7. **updateLocation**
   - **Entradas:** `uint256 _id, string memory _newLocation`
   - **Retorno:** Não retorna valores (`void`).
   - **Descrição:** Atualiza a localização de um ativo.

8. **updateStatus**
   - **Entradas:** `uint256 _id, string memory _newStatus`
   - **Retorno:** Não retorna valores (`void`).
   - **Descrição:** Atualiza o status de um ativo (por exemplo, "ativo", "em manutenção", "descartado").

9. **markAsDisposed**
   - **Entradas:** `uint256 _id`
   - **Retorno:** Não retorna valores (`void`).
   - **Descrição:** Marca um ativo como descartado.

10. **transferOwnership**
    - **Entradas:** `uint256 _id, address _newOwner`
    - **Retorno:** Não retorna valores (`void`).
    - **Descrição:** Transfere a propriedade de um ativo para um novo dono.

11. **registerCategory**
    - **Entradas:** `string memory _name, string memory _description`
    - **Retorno:** Não retorna valores (`void`).
    - **Descrição:** Registra uma nova categoria de ativos.

12. **addAssetToCategory**
    - **Entradas:** `uint256 _categoryId, uint256 _assetId`
    - **Retorno:** Não retorna valores (`void`).
    - **Descrição:** Adiciona um ativo a uma categoria específica.

13. **removeAssetFromCategory**
    - **Entradas:** `uint256 _categoryId, uint256 _assetId`
    - **Retorno:** Não retorna valores (`void`).
    - **Descrição:** Remove um ativo de uma categoria.

14. **updateAssetValue**
    - **Entradas:** `uint256 _id, uint256 _newValue`
    - **Retorno:** Não retorna valores (`void`).
    - **Descrição:** Atualiza o valor monetário de um ativo.

15. **conditionalTransfer**
    - **Entradas:** `address _to, uint256 _tokenId, bool _condition`
    - **Retorno:** Não retorna valores (`void`).
    - **Descrição:** Transfere um ativo para outra carteira se uma condição específica for verdadeira.

### Funções de Consulta (Views)

1. **getAssetDetails**
    - **Entradas:** `uint256 _id`
    - **Retorno:** Retorna uma tupla com detalhes do ativo.
    - **Formato do Retorno:** `(string memory description, string memory currentLocation, uint256 value, string memory status, uint256[] memory history, bool disposed, address currentOwner, uint256 categoryId, uint256 registrationDate)`

2. **getCategoryDetails**
    - **Entradas:** `uint256 _categoryId`
    - **Retorno:** Retorna uma tupla com detalhes da categoria.
    - **Formato do Retorno:** `(string memory categoryName, string memory categoryDescription, uint256[] memory categoryAssets)`

3. **getAssetsByOwner**
    - **Entradas:** `address _owner`
    - **Retorno:** Retorna um array de IDs de ativos.
    - **Formato do Retorno:** `uint256[] memory`

4. **getAssetsByStatus**
    - **Entradas:** `string memory _status`
    - **Retorno:** Retorna um array de IDs de ativos.
    - **Formato do Retorno:** `uint256[] memory`

5. **getAssetsByRegistrationDate**
    - **Entradas:** `uint256 _date`
    - **Retorno:** Retorna um array de IDs de ativos.
    - **Formato do Retorno:** `uint256[] memory`

6. **getAssetsByCategory**
    - **Entradas:** `uint256 _categoryId`
    - **Retorno:** Retorna um array de IDs de ativos.
    - **Formato do Retorno:** `uint256[] memory`

7. **getAssetActivityHistory**
    - **Entradas:** `uint256 _id`
    - **Retorno:** Retorna um array de históricos de atividades.
    - **Formato do Retorno:** `uint256[] memory`

8. **getAssetsByValue**
    - **Entradas:** `uint256 _value`
    - **Retorno:** Retorna um array de IDs de ativos.
    - **Formato do Retorno:** `uint256[] memory`

9. **getAssetsByLocation**
    - **Entradas:** `string memory _location`
    - **Retorno:** Retorna um array de IDs de ativos.
    - **Formato do Retorno:** `uint256[] memory`

10. **getAllCategory**
    - **Entradas:** Nenhuma.
    - **Retorno:** Retorna um array de categorias.
    - **Formato do Retorno:** `Category[] memory`

11. **getAllAssets**
    - **Entradas:** Nenhuma.
    - **Retorno:** Retorna um array de todos os ativos.
    - **Formato do Retorno:** `Asset[] memory`

12. **updateAssetsDetails**
    - **Entradas:** `uint256 _id, string memory _newDescription, string memory _newLocation, uint256 _newValue, string memory _newStatus`
    - **Retorno:** Não retorna valores (`void`).

13. **getAssetsByCategoryAndStatus**
    - **Entradas:** `uint256 _categoryId, string memory _status`
    - **Retorno:** Retorna um array de IDs de ativos.
    - **Formato do Retorno:** `uint256[] memory`

