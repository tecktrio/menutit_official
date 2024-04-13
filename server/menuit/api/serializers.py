from .models import  Division, Users
from .models import Products
from .models import Stores
from .models import Categories
from rest_framework.serializers import ModelSerializer

class ProductSerializer(ModelSerializer):
    class Meta:
        model = Products
        fields = '__all__'
        
class CategorySerializer(ModelSerializer):
    class Meta:
        model = Categories
        fields = '__all__'
        
class UserSerializer(ModelSerializer):
    class Meta:
        model = Users
        fields = '__all__'
        
class DivisionSerializer(ModelSerializer):
    class Meta:
        model = Division
        fields = '__all__'
                 
class StoreSerializer(ModelSerializer):
    class Meta:
        model = Stores
        fields = '__all__'
        
                
                

        