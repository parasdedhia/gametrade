angular.module('gametrade.controllers', [])

.controller('LoginCtrl', function ($timeout,$scope, $ionicModal, $state, $firebaseAuth, $ionicLoading, $rootScope) {
    //console.log('Login Controller Initialized');

    var ref = new Firebase($scope.firebaseUrl);
    var auth = $firebaseAuth(ref);

    $ionicModal.fromTemplateUrl('templates/signup.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });

    $scope.createUser = function (user) {
        console.log("Create User Function called");
        if (user && user.email && user.password && user.displayname) {
            $ionicLoading.show({
                template: 'Signing Up...'
            });

            auth.$createUser({
                email: user.email,
                password: user.password
            }).then(function (userData) {
                alert("User created successfully!");
                ref.child("users").child(userData.uid).set({
                    email: user.email,
                    displayName: user.displayname,
                    //post: ""
                });
                $ionicLoading.hide();
                $scope.modal.hide();
            }).catch(function (error) {
                alert("Error: " + error);
                $ionicLoading.hide();
            });
        } else
            alert("Please fill all details");
    }

    $scope.signIn = function (user) {

        if (user && user.email && user.pwdForLogin) {
            $ionicLoading.show({
                template: 'Signing In...'
            });
            auth.$authWithPassword({
                email: user.email,
                password: user.pwdForLogin
            }).then(function (authData) {
                console.log("Logged in as:" + authData.uid);
                ref.child("users").child(authData.uid).once('value', function (snapshot) {
                    
                    var val = snapshot.val();
                    // To Update AngularJS $scope either use $apply or $timeout
                    $timeout(function () {
                        $rootScope.displayName = val;
                    });
                });
                $ionicLoading.hide();
                $state.go('tab.posts');
            }).catch(function (error) {
                alert("Authentication failed:" + error.message);
                $ionicLoading.hide();
            });
        } else
            alert("Please enter email and password both");
    }
})


.controller('DisplayCtrl',function($scope,$firebase,$ionicModal, $ionicLoading, $firebaseAuth, $state){
  console.log("Display Controller initialized");
  var ref = new Firebase($scope.firebaseUrl);
  var addPostRef=new Firebase("https://gametrade.firebaseio.com/posts");
  var addCommRef=new Firebase("https://gametrade.firebaseio.com/comments");
  var auth = $firebaseAuth(ref);
  var authData= ref.getAuth();
  $scope.whichPost=$state.params.aId;
  $scope.postContent=$state.params.post;
  $scope.posted_at=$state.params.posted_at;
  var post=$firebase(ref.child('posts')).$asArray();
  
  var comments=$firebase(ref.child('comments')).$asArray();
  $scope.comments=comments;
  $scope.addPost = function (user) {
    console.log("Post function called");
        if (user && user.newPost) {
          
            $ionicLoading.show({
                template: 'Adding post...'
            });
                  addPostRef.push({
                    Posted_at:Firebase.ServerValue.TIMESTAMP,
                    from: authData.password.email,
                    post:user.newPost
                  });

                $ionicLoading.hide();
                $scope.modal.hide();
                
      } else {
            alert("Please fill all details");       
    }

  }

   $scope.addComment = function (comment) {
    console.log("Comment function called.");
    console.log(comment);
    
        addCommRef.push({
                    commented_at:Firebase.ServerValue.TIMESTAMP,
                    from: authData.password.email,
                    comment:comment,
                    to: $scope.whichPost,
                    postCreateTime: $scope.posted_at
                  });
        console.log("commenting");
        this.comment=null;
      }
  

  $ionicModal.fromTemplateUrl('templates/addPost.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });

 
    $scope.post=post;
    console.log($scope.post);
  
    console.log($scope.whichPost);
  
    console.log($scope.posted_at);
  $scope.toggleStar=function(name){
    name.star=!name.star;
  }
})

.controller('ProfileCtrl',function($state,$scope,$firebase,$firebaseAuth,$ionicModal,$ionicLoading){
  console.log("Profile Controller initialized");
  var ref = new Firebase($scope.firebaseUrl);
  var auth = $firebaseAuth(ref);
  var authData= ref.getAuth();
  var addref=new Firebase("https://gametrade.firebaseio.com/posts");
  var post=$firebase(ref.child('posts')).$asArray();
  var email=authData.password.email; 
  $scope.posted_at=$state.params.posted_at;

  ref.child("users").orderByKey().startAt(authData.uid).limitToFirst(1).once("value",
function(snapshot) {

   var profile = snapshot.val();
   $scope.userData=profile;
   $scope.email=email;
   $scope.post=post;
});

  $ionicModal.fromTemplateUrl('templates/editProfile.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });

   /* $scope.updateshow=function(post1){
      console.log($scope.posted_at);
      var posting = $firebase(ref.child('posts')).$asArray();
      var time;
        

       posting.$loaded()
            .then(function(){
            angular.forEach(posting, function(user) {
              time = [user.Posted_at]; 
              console.log(user.Posted_at);
            for (i in time){
              
              console.log(time[i]);
            }
            
             })
      })

    ref.child("posts").orderByKey().startAt(authData.uid).limitToFirst(1).once("value",
function(snapshot) {

   var post = snapshot.val();
   
   $scope.post=post;
   console.log(post);

});
  };*/

    $scope.deletePost=function(post){
      console.log(post.post);
      $scope.post.$remove(post);

    };
  
});
