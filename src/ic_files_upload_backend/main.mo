import Text "mo:base/Text";
import TrieMap "mo:base/TrieMap";
import Bool "mo:base/Bool";
import Iter "mo:base/Iter";
actor {

  public type Dog = {
    id : Text;
    name : Text;
    description : Text;
    images : {
      image1 : Text;
      image2 : Text;
      image3 : Text;
    };
  };

  var mapOfDogs = TrieMap.TrieMap<Text, Dog>(Text.equal, Text.hash);

  public shared func saveDog(dog : Dog) : async Bool {
    let id = dog.id;
    mapOfDogs.put(id, dog);
    return true;
  };

  public shared query func getDogs(): async [Dog] {
    let dogs = Iter.toArray(mapOfDogs.vals());
    return dogs;
  }

};
