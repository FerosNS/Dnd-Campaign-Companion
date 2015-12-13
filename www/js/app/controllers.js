/**
 * beginnings of a controller to login to system
 * here for the purpose of showing how a service might
 * be used in an application
 */
angular.module('app.controllers', [])
    .controller('ListDetailCtrl', [
        '$state', '$scope', '$stateParams', 'UserService',   // <-- controller dependencies
        function ($state, $scope, $stateParams, UserService) {

            $scope.index = $stateParams.itemId;

        }])
    .controller('ListCtrl', [
        '$state', '$scope', 'UserService',   // <-- controller dependencies
        function ($state, $scope, UserService) {

            $scope.dataList = ["One", "Two", "Three"];


            $scope.doLogoutAction = function () {
                UserService.logout().then(function () {

                    // transition to next state
                    $state.go('app-login');

                }, function (_error) {
                    alert("error logging in " + _error.debug);
                })
            };


        }])

    .controller('CharacterCtrl', [
        '$state', '$scope', 'UserService',   // <-- controller dependencies
        function ($state, $scope, UserService) {

            $scope.character = [];
            UserService.currentUser().then(function (_user) {
                var character = Parse.Object.extend("Character"),
                    query = new Parse.Query(character);

                $scope.user = _user;

                query.equalTo("username", $scope.user.attributes.username)

                query.find({
                    success: function (results){
                        if (!results[0]) {
                            var CharacterObject = Parse.Object.extend("Character");
                            var c = new CharacterObject();
                            c.set("username", $scope.user.attributes.username);
                            c.save();
                        }
                        else {
                            var object = results[0];
                            //grab the first object because there SHOULD only be one
                            $scope.character.push({
                                characterName: object.attributes.characterName,
                                race: object.attributes.race,
                                alignment: object.attributes.alignment,
                                class: object.attributes.class,
                                level: object.attributes.level,
                                strength: object.attributes.strength,
                                dexterity: object.attributes.dexterity,
                                constitution: object.attributes.constitution,
                                intelligence: object.attributes.intelligence,
                                wisdom: object.attributes.wisdom,
                                charisma: object.attributes.charisma,
                            });
                        }
                    },
                    error: function (error) {
                        console.log("Error", error);
                    }
                });
            });
            $scope.doLogoutAction = function () {
                UserService.logout().then(function () {

                    // transition to next state
                    $state.go('app-login');

                }, function (_error) {
                    alert("error logging in " + _error.debug);
                })
            };
            $scope.characterSave = function (_user) {
                UserService.currentUser().then(function (_user) {
                    $scope.user = _user;
                    $scope.save = [];
                    var tabObject = Parse.Object.extend("Character"),
                        query = new Parse.Query(tabObject);
                    query.equalTo("username", $scope.user.attributes.username)
                    query.find({
                        success: function (results) {
                            console.log($scope.character[0]);
                            var object = results[0];
                            object.set("characterName", $scope.character[0].characterName);
                            object.set("race", $scope.character[0].race);
                            object.set("alignment", $scope.character[0].alignment);
                            object.set("class", $scope.character[0].class);
                            object.set("level", parseInt($scope.character[0].level, 10));
                            object.set("strength", parseInt($scope.character[0].strength, 10));
                            object.set("dexterity", parseInt($scope.character[0].dexterity, 10));
                            object.set("constitution", parseInt($scope.character[0].constitution, 10));
                            object.set("intelligence", parseInt($scope.character[0].intelligence, 10));
                            object.set("wisdom", parseInt($scope.character[0].wisdom, 10));
                            object.set("charisma", parseInt($scope.character[0].charisma, 10));
                            object.save();
                            $state.go($state.current, {}, {});
                        }
                    });
                });
            }


        }])

   .controller('CombatCtrl', [
        '$state', '$scope', 'UserService',   // <-- controller dependencies
        function ($state, $scope, UserService) {

            $scope.doLogoutAction = function () {
                UserService.logout().then(function () {

                    // transition to next state
                    $state.go('app-login');

                }, function (_error) {
                    alert("error logging in " + _error.debug);
                })
            };

            $scope.combatSave = function (_user) {
                UserService.currentUser().then(function (_user) {
                    $scope.user = _user;
                    $scope.save = [];
                    var parameter = Parse.Object.extend("Combat");
                    var query = new Parse.Query(parameter);
                    query.equalTo("username", $scope.user.attributes.username)
                    query.find({
                        success: function (results) {
                            var object = results[0];
                            console.log($scope);
                            object.set("HP", parseInt($scope.combat[0].HP, 10));
                            object.set("AC", parseInt($scope.combat[0].AC, 10));
                            object.set("initiative", parseInt($scope.combat[0].Init, 10));
                            object.set("Fortitude", parseInt($scope.combat[0].Fort, 10));
                            object.set("Reflex", parseInt($scope.combat[0].Reflex, 10));
                            object.set("Will", parseInt($scope.combat[0].Will, 10));
                            object.set("BaseAttack", parseInt($scope.combat[0].BaseA, 10));
                            object.set("Grapple", parseInt($scope.combat[0].Grapple, 10));
                            object.set("Attack", $scope.combat[0].Attack);
                            object.set("AttackBonus", $scope.combat[0].AttackBonus);
                            object.set("Damage", $scope.combat[0].Damage);
                            object.set("Critical", $scope.combat[0].Critical);
                            object.set("Range", $scope.combat[0].Range);
                            object.set("Type", $scope.combat[0].Type);
                            object.set("Notes", $scope.combat[0].Notes);
                            console.log(object);
                            object.save();
                            $state.go($state.current, {}, {});
                        }
                    });
                });
            };

            $scope.combat = [];
            UserService.currentUser().then(function (_user) {
                $scope.user = _user;
                var combat = Parse.Object.extend("Combat");
                var query = new Parse.Query(combat);

                console.log($scope.user.attributes.username);

                query.equalTo("username", $scope.user.attributes.username);

                query.find({success: function (results) {
                        if (!results[0]) {
                            var array = [];
                            var CombatObject = Parse.Object.extend("Combat");
                            var c = new CombatObject();
                            c.set("username", $scope.user.attributes.username);
                            c.set("Attack", array);
                            c.save();
                        }
                        else {
                            console.log("success achieved");
                            console.log(results);
                            var object = results[0];
                            console.log(object);
                            $scope.combat.push({
                                HP: object.attributes.HP,
                                AC: object.attributes.AC,
                                Init: object.attributes.initiative,
                                Fort: object.attributes.Fortitude,
                                Reflex: object.attributes.Reflex,
                                Will: object.attributes.Will,
                                BaseA: object.attributes.BaseAttack,
                                Grapple: object.attributes.Grapple,
                                Attack: object.attributes.Attack,
                                AttackBonus: object.attributes.AttackBonus,
                                Damage: object.attributes.Damage,
                                Critical: object.attributes.Critical,
                                Range: object.attributes.Range,
                                Notes: object.attributes.Notes
                                
                            });
                        }
                        console.log($scope.combat[0]);
                        $state.go($state.current, {}, {});
                    },
                    error: function (error) {
                        console.log("Error achieved");
                    }
            });
        });
    }]);