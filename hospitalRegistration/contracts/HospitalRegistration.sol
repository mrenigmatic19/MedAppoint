// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HospitalRegistration {
    struct Hospital {
        string name;
        string email;
        uint256 contact;
        string org;
        string pin;
        uint256 establishedin;
        string hospitalAddress;
        bool isRegistered;
    }

    mapping(address => Hospital) public hospitals;
    address public platformAddress;
    uint256 public penaltyAmount = 100 ether;

    event HospitalRegistered(address indexed hospitalAddress, string name);
    event HospitalPunished(address indexed hospitalAddress, uint256 penaltyAmount);

    modifier onlyPlatform() {
        require(msg.sender == platformAddress, "Only platform can call this function.");
        _;
    }

    constructor() {
        platformAddress = msg.sender;
    }

    function registerHospital(
        string memory name,
        string memory email,
        uint256 contact,
        string memory org,
        string memory pin,
        uint256 establishedin,
        string memory hospitalAddress
    ) public {
        require(!hospitals[msg.sender].isRegistered, "Hospital already registered.");
        hospitals[msg.sender] = Hospital(name, email, contact, org, pin, establishedin, hospitalAddress, true);
        emit HospitalRegistered(msg.sender, name);
    }

    function punishHospital(address hospitalAddress) public onlyPlatform {
        Hospital storage hospital = hospitals[hospitalAddress];
        require(hospital.isRegistered, "Hospital not registered.");
        payable(platformAddress).transfer(penaltyAmount);
        emit HospitalPunished(hospitalAddress, penaltyAmount);
    }

    function getHospitalDetails(address hospitalAddress) public view returns (Hospital memory) {
        return hospitals[hospitalAddress];
    }

    function setPenaltyAmount(uint256 amount) public onlyPlatform {
        penaltyAmount = amount;
    }

    function withdraw() public onlyPlatform {
        payable(platformAddress).transfer(address(this).balance);
    }

    receive() external payable {}
}
