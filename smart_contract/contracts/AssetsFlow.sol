// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AssetsFlow is ERC721, Ownable {
    constructor() ERC721("AssetsFlow", "ASFL") Ownable(msg.sender) {
    }

    // Struct para representar um ativo móvel
    struct Asset {
        string description;
        string currentLocation;
        uint256 value;
        string status;
        uint256[] history;
        bool disposed;
        address currentOwner;
        uint256 categoryId;
        uint256 registrationDate;
    }

    // Struct para representar uma categoria de ativos
    struct Category {
        string name;
        string description;
        uint256[] assets;
    }

    // Mapeamento para armazenar ativos móveis
    mapping(uint256 => Asset) public assets;

    // Mapeamento para armazenar categorias
    mapping(uint256 => Category) public categories;

    uint256 public nextAssetId;
    uint256 public nextCategoryId;

    // Eventos
    event AssetRegistered(uint256 indexed id, string description, string currentLocation, uint256 value);
    event AssetDescriptionUpdated(uint256 indexed id, string newDescription);
    event AssetLocationUpdated(uint256 indexed id, string newLocation);
    event AssetStatusUpdated(uint256 indexed id, string newStatus);
    event AssetDisposed(uint256 indexed id);
    event CategoryRegistered(uint256 indexed id, string name, string description);
    event AssetAddedToCategory(uint256 indexed assetId, uint256 categoryId);
    event AssetRemovedFromCategory(uint256 indexed assetId, uint256 categoryId);

    // Modificador para garantir que apenas o proprietário possa acessar algumas funcionalidades
    modifier onlyOwnerOf(uint256 _assetId) {
        require(ownerOf(_assetId) == msg.sender, "You are not the owner of this asset.");
        _;
    }

    // Função para registrar um novo ativo móvel
    function registerAsset(
        string memory _description,
        string memory _currentLocation,
        uint256 _value,
        uint256 _categoryId
    ) external onlyOwner {
        uint256 id = nextAssetId++;
        _mint(msg.sender, id);

        Asset storage newAsset = assets[id];
        newAsset.description = _description;
        newAsset.currentLocation = _currentLocation;
        newAsset.value = _value;
        newAsset.status = "active";
        newAsset.disposed = false;
        newAsset.currentOwner = msg.sender;
        newAsset.categoryId = _categoryId;
        newAsset.registrationDate = block.timestamp;

        categories[_categoryId].assets.push(id);

        emit AssetRegistered(id, _description, _currentLocation, _value);
    }

    // Função para atualizar a descrição de um ativo móvel
    function updateAssetDescription(uint256 _id, string memory _newDescription) external onlyOwnerOf(_id) {
        assets[_id].description = _newDescription;
        emit AssetDescriptionUpdated(_id, _newDescription);
    }
    

    // Função para atualizar o status de manutenção de um ativo
    function updateMaintenanceStatus(uint256 _id, bool _inMaintenance) external onlyOwnerOf(_id) {
        if (_inMaintenance) {
            assets[_id].status = "maintenance";
        } else {
            assets[_id].status = "active";
        }
        emit AssetStatusUpdated(_id, assets[_id].status);
    }

    // Função para atualizar o nome de uma categoria existente
    function updateCategoryName(uint256 _categoryId, string memory _newName) external onlyOwner {
        categories[_categoryId].name = _newName;
    }

    // Função para atualizar a descrição de uma categoria existente
    function updateCategoryDescription(uint256 _categoryId, string memory _newDescription) external onlyOwner {
        categories[_categoryId].description = _newDescription;
    }

    // Função para definir um novo proprietário do contrato
    function setContractOwner(address _newOwner) external onlyOwner {
        _transferOwnership(_newOwner);
    }

    // Função para atualizar a localização de um ativo móvel
    function updateLocation(uint256 _id, string memory _newLocation) external onlyOwnerOf(_id) {
        assets[_id].currentLocation = _newLocation;
        emit AssetLocationUpdated(_id, _newLocation);
    }

    // Função para atualizar o status de um ativo móvel
    function updateStatus(uint256 _id, string memory _newStatus) external onlyOwnerOf(_id) {
        assets[_id].status = _newStatus;
        emit AssetStatusUpdated(_id, _newStatus);
    }

    // Função para marcar um ativo como descartado
    function markAsDisposed(uint256 _id) external onlyOwnerOf(_id) {
        assets[_id].disposed = true;
        assets[_id].status = "disposed";

        emit AssetDisposed(_id);
    }

    // Função para transferir a propriedade de um ativo móvel
    function transferOwnership(uint256 _id, address _newOwner) external onlyOwnerOf(_id) {
        address _previousOwner = assets[_id].currentOwner;

        _transfer(_previousOwner, _newOwner, _id);
        assets[_id].currentOwner = _newOwner;

    }

    // Função para registrar uma nova categoria de ativos
    function registerCategory(string memory _name, string memory _description) external onlyOwner {
        uint256 id = nextCategoryId++;
        categories[id] = Category(_name, _description, new uint256[](0));

        emit CategoryRegistered(id, _name, _description);
    }

    // Função para adicionar um ativo a uma categoria
    function addAssetToCategory(uint256 _categoryId, uint256 _assetId) external onlyOwner {
        categories[_categoryId].assets.push(_assetId);

        emit AssetAddedToCategory(_assetId, _categoryId);
    }

    // Função para remover um ativo de uma categoria
    function removeAssetFromCategory(uint256 _categoryId, uint256 _assetId) external onlyOwner {
        uint256[] storage _categoryAssets = categories[_categoryId].assets;
        for (uint256 i = 0; i < _categoryAssets.length; i++) {
            if (_categoryAssets[i] == _assetId) {
                _categoryAssets[i] = _categoryAssets[_categoryAssets.length - 1];
                _categoryAssets.pop();
                break;
            }
        }

        emit AssetRemovedFromCategory(_assetId, _categoryId);
    }

    // Função para recuperar os detalhes de um ativo móvel
    function getAssetDetails(uint256 _id) external view returns (
        string memory description,
        string memory currentLocation,
        uint256 value,
        string memory status,
        uint256[] memory history,
        bool disposed,
        address currentOwner,
        uint256 categoryId,
        uint256 registrationDate
    ) {
        Asset memory asset = assets[_id];
        return (
            asset.description,
            asset.currentLocation,
            asset.value,
            asset.status,
            asset.history,
            asset.disposed,
            asset.currentOwner,
            asset.categoryId,
            asset.registrationDate
        );
    }

    // Função para recuperar os detalhes de uma categoria
    function getCategoryDetails(uint256 _categoryId) external view returns (
        string memory categoryName,
        string memory categoryDescription,
        uint256[] memory categoryAssets
    ) {
        Category memory category = categories[_categoryId];
        return (
            category.name,
            category.description,
            category.assets
        );
    }

    // Função para recuperar os ativos de um determinado proprietário
    function getAssetsByOwner(address _owner) external view returns (uint256[] memory) {
        uint256 totalAssets = nextAssetId;
        uint256[] memory ownerAssets = new uint256[](totalAssets);
        uint256 count = 0;
        for (uint256 i = 0; i < totalAssets; i++) {
            if (assets[i].currentOwner == _owner) {
                ownerAssets[count] = i;
                count++;
            }
        }
        // Redimensiona o array para caber o número real de ativos de propriedade do proprietário
        assembly {
            mstore(ownerAssets, count)
        }
        return ownerAssets;
    }

    // Função para recuperar os ativos por status
    function getAssetsByStatus(string memory _status) external view returns (uint256[] memory) {
        uint256 totalAssets = nextAssetId;
        uint256[] memory result = new uint256[](totalAssets);
        uint256 count = 0;
        for (uint256 i = 0; i < totalAssets; i++) {
            if (keccak256(abi.encodePacked(assets[i].status)) == keccak256(abi.encodePacked(_status))) {
                result[count] = i;
                count++;
            }
        }
        return result;
    }

    // Função para recuperar os ativos por data de registro
    function getAssetsByRegistrationDate(uint256 _date) external view returns (uint256[] memory) {
        uint256 totalAssets = nextAssetId;
        uint256[] memory result = new uint256[](totalAssets);
        uint256 count = 0;
        for (uint256 i = 0; i < totalAssets; i++) {
            if (assets[i].registrationDate == _date) {
                result[count] = i;
                count++;
            }
        }
        return result;
    }

    // Função para recuperar os ativos por categoria
    function getAssetsByCategory(uint256 _categoryId) external view returns (uint256[] memory) {
        return categories[_categoryId].assets;
     }

    // Função para atualizar o valor de um ativo móvel
    function updateAssetValue(uint256 _id, uint256 _newValue) external onlyOwnerOf(_id) {
        assets[_id].value = _newValue;
    }

    // Função para transferir um token de forma condicional com base em uma condição
    function conditionalTransfer(address _to, uint256 _tokenId, bool _condition) external {
        require(ownerOf(_tokenId) == msg.sender, "You are not the owner of this token.");
        require(_condition, "Condition not met for transfer.");
        safeTransferFrom(msg.sender, _to, _tokenId);
    }

    // Função para consultar o histórico de atividades de um ativo
    function getAssetActivityHistory(uint256 _id) external view returns (uint256[] memory) {
        return assets[_id].history;
    }

    // Função para consultar os ativos por valor
    function getAssetsByValue(uint256 _value) external view returns (uint256[] memory) {
        uint256 totalAssets = nextAssetId;
        uint256[] memory result = new uint256[](totalAssets);
        uint256 count = 0;
        for (uint256 i = 0; i < totalAssets; i++) {
            if (assets[i].value == _value) {
                result[count] = i;
                count++;
            }
        }
        return result;
    }

    // Função para consultar os ativos por localização
    function getAssetsByLocation(string memory _location) external view returns (uint256[] memory) {
        uint256 totalAssets = nextAssetId;
        uint256[] memory result = new uint256[](totalAssets);
        uint256 count = 0;
        for (uint256 i = 0; i < totalAssets; i++) {
            if (keccak256(abi.encodePacked(assets[i].currentLocation)) == keccak256(abi.encodePacked(_location))) {
                result[count] = i;
                count++;
            }
        }
        return result;
    }
    // Função para recuperar todos os detalhes das categorias
    function getAllCategory() public view returns (Category[] memory) {
        Category[] memory allCategories = new Category[](nextCategoryId);
        for (uint256 i = 0; i < nextCategoryId; i++) {
            allCategories[i] = categories[i];
        }
        return allCategories;
    }

    // Função para atualizar os detalhes de uma categoria existente
    function updateCategoryDetails(uint256 _categoryId, string memory _newName, string memory _newDescription) public onlyOwner {
        Category storage category = categories[_categoryId];
        category.name = _newName;
        category.description = _newDescription;
    }

    // Função para recuperar todos os ativos
    function getAllAssets() public view returns (Asset[] memory) {
        Asset[] memory allAssets = new Asset[](nextAssetId);
        for (uint256 i = 0; i < nextAssetId; i++) {
            allAssets[i] = assets[i];
        }
        return allAssets;
    }

    // Função para atualizar todos os detalhes de um ativo existente
    function updateAssetsDetails(uint256 _id, string memory _newDescription, string memory _newLocation, uint256 _newValue, string memory _newStatus) public onlyOwnerOf(_id) {
        Asset storage asset = assets[_id];
        asset.description = _newDescription;
        asset.currentLocation = _newLocation;
        asset.value = _newValue;
        asset.status = _newStatus;
    }

    // Função para consultar os ativos por categoria e status combinados
    function getAssetsByCategoryAndStatus(uint256 _categoryId, string memory _status) external view returns (uint256[] memory) {
        uint256[] storage categoryAssets = categories[_categoryId].assets;
        uint256[] memory result = new uint256[](categoryAssets.length);
        uint256 count = 0;
        for (uint256 i = 0; i < categoryAssets.length; i++) {
            uint256 assetId = categoryAssets[i];
            if (keccak256(abi.encodePacked(assets[assetId].status)) == keccak256(abi.encodePacked(_status))) {
                result[count] = assetId;
                count++;
            }
        }
        return result;
    }
}
