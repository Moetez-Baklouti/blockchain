//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Expedition {
    struct FormData {
        string ref;
        string date;
        string qrcode;
    }

    FormData[] public formDataList;
    mapping(string => FormData) refToFormData; // Mapping from reference to FormData
    mapping(string => FormData) qrToFormData; // Mapping from QR code to FormData
    string constant chars = "AZERTYUIOPQSDFGHJKLMWXCVBNazertyuiopqsdfghjklmwxcvbn123456789";

    function storeFormData(string memory _ref, string memory _date) public returns (string memory) {
        string memory _code = generateRandomString();
        FormData memory newFormData = FormData(_ref, _date, _code);
        formDataList.push(newFormData);
        qrToFormData[_code] = newFormData; // Add mapping from QR code to FormData
        refToFormData[_ref] = newFormData; // Add mapping from reference to FormData
        return newFormData.qrcode;
    }

    function getLatestReference() public view returns (string memory, string memory) {
        if (formDataList.length > 0) {
            FormData memory latestFormData = formDataList[formDataList.length - 1];
            return (latestFormData.ref, latestFormData.date);
        } else {
            return ("null","null");
        }
    }

    function listAllFormData() public view returns (FormData[] memory) {
        return formDataList;
    }

    function generateRandomString() internal view returns (string memory) {
        uint length = 100;
        bytes memory randomBytes = new bytes(length);
        for (uint i = 0; i < length; i++) {
            randomBytes[i] = bytes(chars)[uint(keccak256(abi.encodePacked(block.timestamp, block.difficulty, msg.sender, i))) % bytes(chars).length];
        }
        return string(randomBytes);
    }

    function getFormDataByQR(string memory _qrcode) public view returns (string memory, string memory, string memory) {
        FormData memory formData = qrToFormData[_qrcode];
        return (formData.ref, formData.date, formData.qrcode);
    }
    
    function getFormDataByReference(string memory _ref) public view returns (string memory, string memory, string memory) {
        FormData memory formData = refToFormData[_ref];
        return (formData.ref, formData.date, formData.qrcode);
    }
}