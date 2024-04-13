import datetime
from django.shortcuts import render
from rest_framework_simplejwt.authentication import JWTAuthentication
# Create your views here.
from django.shortcuts import render
from rest_framework.authentication import BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from . authenticate import isUser

from . decorators import check_header_key

# from . authenticate import isUser
from . models import  Products
from . models import Division
from . models import Categories
from . models import Users
from . models import Stores
from .serializers import  DivisionSerializer, UserSerializer, StoreSerializer
from .serializers import ProductSerializer
from .serializers import CategorySerializer
from django.conf import settings
import jwt
from rest_framework_simplejwt.tokens import RefreshToken
# Create your views here.


class ManageProducts(APIView):
    def get(self, request):
        if 'shop_owner_username' in request.query_params and 'store_name' in request.query_params and 'division_name' in request.query_params:
            shop_owner_username = request.query_params.get('shop_owner_username')
            store_name = request.query_params.get('store_name')
            division_name = request.query_params.get('division_name')
            shop_owner = Users.objects.filter(username=shop_owner_username).first()
            if shop_owner:
                store = Stores.objects.filter(store_owner=shop_owner, store_name=store_name).first()
                if store:
                    division = Division.objects.filter(division_store=store, division_name=division_name).first()
                    if division:
                        products = Products.objects.filter(product_division=division)
                        if 'price' in request.query_params:
                            print('applying price filter')
                            price_filter = request.query_params.get('price')
                            products = products.filter(product_price__lt = price_filter)
                            
                        if 'category' in request.query_params:
                            print('applying category filter')
                            category_filter = request.query_params.get('category')
                            products = products.filter(product_category = category_filter)
                        
                        if 'search' in request.query_params:
                            print('applying search filter')
                            keyword = request.query_params.get('search')
                            products = products.filter(product_name__startswith = keyword)
                            if products:
                                products = products
                            else:
                                products = []
                        
                        serialized_products = ProductSerializer(products, many=True)
                        return Response(serialized_products.data, status = 200)
                    else:
                        return Response({'reason':'division not found'},status = 404)
                else:
                    return Response({'reason':'store not found'},status = 404)
            else:
                return Response({'reason':'shop_owner not found'},status = 404)
        else:
            return Response({"reason":'missing keys shop_owner_username, division_name, store_name '},status = 422)

    def post(self, request):
        data = request.data
        user = isUser(request)
        if user:
            if 'product_name' in data and 'product_price' in data and 'product_category' in data and 'product_description' in data and 'product_image_url' in data and 'store_name' in data and 'division_name' in data:
                try:
                    product_name = request.data['product_name']
                    product_price = request.data['product_price']
                    product_category = request.data['product_category']
                    product_description = request.data['product_description']
                    product_image_url = request.data['product_image_url']
                    # product_unique_id = request.data['product_unique_id']
                    
                    store_name = request.data['store_name']
                    division_name = request.data['division_name']
                    
                    shop_owner = Users.objects.filter(id=user.id).first()
                    if shop_owner:
                        store = Stores.objects.filter(store_owner=shop_owner, store_name=store_name).first()
                        if store:
                            division = Division.objects.filter(division_store=store, division_name=division_name).first()
                            if division:
                                product = Products.objects.filter(product_name = product_name).first()
                                if product:
                                    return Response({"reason":"product already exist"}, status=500)
                                
                                category = Categories.objects.filter(category_name = product_category).first()
                                if category:
                                    Products.objects.create(
                                        product_name = product_name,
                                        product_category = category, 
                                        product_description = product_description,
                                        product_image_url = product_image_url,
                                        # product_unique_id = product_unique_id,
                                        product_price = product_price,
                                        product_division = division
                                    ).save()
                                    return Response(status = 200)
                                else:
                                    return Response({"reason":"category not found"},status = 404)
                            else:
                                return Response({"reason":"division not found"},status = 404)
                        else:
                            return Response({"reason":"store not found"},status = 404)
                    else:
                        return Response({"reason":"user not found"},status = 404)
                    
                except Exception as e:
                    return Response({'reason':e}, status=500)
            else:
                return Response({'reason':'required fields product_name, product_price, product_category, product_description, product_image_url, shop_owner_username, store_name, division_name '},status=422)
        else:
            return Response(status=401)
    def put(self, request):
        if isUser:
            try:
                key1 = request.data['key']
                value = request.data['value']
                product_unique_id = request.data['product_unique_id']
                try:
                    product = Products.objects.get(product_unique_id=product_unique_id)
                except Products.DoesNotExist:
                    return Response(status=404)

                # Update the field dynamically
                setattr(product, key1, value)
                    
                try:
                    product.save()
                except:
                    return Response(status=500)

            except:
                return Response(status=404)
        else:
            return Response(status=401)
    def delete(self, request):
        if isUser:
            product_unique_id = request.query_params.get('product_unique_id')
            if Products.objects.filter(product_unique_id = product_unique_id).exist():
                product = Products.objects.get(product_unique_id = product_unique_id)
                try:
                    product.delete()
                    return Response(status=200)
                except:
                    return Response(status=404)
            else:
                return Response(status=404)
        else:
            return Response(status=401)
  
class ManageCategories(APIView):

    def get(self, request):
        categories = Categories.objects.all()
        serialized_categories = CategorySerializer(categories, many = True)
        return Response({'status':202, 'data':serialized_categories.data})
    
    def post(self, request):
        if isUser(request):
            try:
                category_name = request.data['category_name']
                category_description = request.data['category_description']
                category_image_url = request.data['category_image_url']
                
                if Categories.objects.filter(category_name = category_name).exists():
                    return Response(status=409)
                
                category = Categories.objects.create(
                    category_name = category_name, 
                    category_description = category_description, 
                    category_image_url = category_image_url
                )
                
                try:
                    category.save()
                except:
                    return Response(status=200)
                return Response(status=200)
            except:
                return Response({ 'reason':'Required Fields category_name, category_description, category_image_url '},status=422)
        else:
            return Response(status=401)
        
    def put(self, request):
        if isUser(request):
            category_id = request.data['category_id']
            category_name = request.data['category_name']
            category_price = request.data['category_price']
            category_description = request.data['category_description']
            category_image_url = request.data['category_image_url']
            
            if Categories.objects.filter(id = category_id).exists():
                category = Categories.objects.get(id = category_id)
                category.category_name = category_name
                category.category_price = category_price
                category.category_description  = category_description
                category.category_image_url = category_image_url
                
                try:
                    category.save()
                except:
                    return Response(status=500)
            else:
                return Response(status=404)
        else:
            return Response(status=401)
        
    def delete(self, request):
        if isUser(request):
            try:
                category_id = request.data['category_id']
                if Categories.objects.filter(id = category_id).exists():
                    category = Categories.objects.get(id = category_id)
                    try:
                        category.delete()
                        return Response(status=200)
                    except:
                        return Response(status=200)
                else:
                    return Response(status=200)
            except Exception as e:
                return Response({ 'reason':e},status=422)
        else:
            return Response(status=401)
    
class UserRegister(APIView):
      def post(self, request):
        try:
            data = request.data
          
            if 'email' in data and 'contact' in data and 'username' in data and 'password' in data:
                email_id = request.data['email']
                contact = request.data['contact']
                username = request.data['username']
                password = request.data['password']
                if Users.objects.filter(email = email_id, contact = contact).first():
                    return Response({'reason':'user already exist'}, status=409)
                
                    
                shopOwner = Users.objects.create( email = email_id, password = password, contact = contact, username = username)
                shopOwner.save()
                
                refresh = RefreshToken.for_user(shopOwner)
                response = Response({'token': str(refresh.access_token)}, status=200)
                return response
            else:
                return Response({'reason':'required username, password, email, contact'},status=422)
           
        except Exception as e:
            return Response({'reason': str(e)},status=422)
        
class UserLogin(APIView):
      def post(self, request):
        data = request.data
        if 'email' in data and 'password' in data:
                email = request.data['email']
                password = request.data['password']
                shopOwner = Users.objects.filter(email = str(email).lower()).first()
                if shopOwner:
                    if shopOwner.password == password:
                        refresh = RefreshToken.for_user(shopOwner)
                        response = Response({'token': str(refresh.access_token)}, status=200)
                        # response.set_cookie('token', str(refresh.access_token))
                        return response
                    else:
                        return Response({'reason': 'Invalid Password'}, status=401)
                else:
                    return Response({'reason': 'Invalid email'}, status=401)

        else:
            return Response({'reason':'required email, password'},status=422)
        
class ManageProfile(APIView):
    
    def get(self, request):
        user = isUser(request)
        if user:
            # if 'user_id' in request.query_params:
            #     if Users.objects.filter(id = request.query_params.get('shop_owner_id')).exists():
            #         shopOwner = Users.objects.get(id = request.query_params.get('shop_owner_id'))
            serialized_shopOwner = UserSerializer(user, many = False)
                # else:
                #     return Response(status=404)
            # else:
            #     shopOwner = Users.objects.all()
            #     serialized_shopOwner = UserSerializer(shopOwner, many = True)
                
            return Response({'data':serialized_shopOwner.data}, status=200)
        else:
            return Response(status=401)
    def post(self, request):
        try:
            data = request.data
            if 'email' in data and 'password' in data:
                email = request.data['email']
                password = request.data['password']
                shopOwner = Users.objects.filter(email = str(email).lower()).first()
                if shopOwner:
                    if shopOwner.password == password:
                        refresh = RefreshToken.for_user(shopOwner)
                        response = Response({'token': str(refresh.access_token)}, status=200)
                        # response.set_cookie('token', str(refresh.access_token))
                        return response
                    else:
                        return Response({'reason': 'login failed'}, status=401)
                elif 'email' in data and 'contact' in data:
                    email_id = request.data['email']
                    contact = request.data['contact']
                    shopOwner = Users.objects.create( email = email, password = password, contact = contact)
                    shopOwner.save()
                    
                    refresh = RefreshToken.for_user(shopOwner)
                    response = Response({'token': str(refresh.access_token)}, status=200)
                    return response
                else:
                    return Response({'reason':'required username, password, email, contact'},status=422)
            else:
                return Response({'reason':'required username, password'}, status=422)
        except Exception as e:
            return Response({'reason': str(e)},status=422)

    def put(self, request):
        user = isUser(request)
        if user:
            if all(item in request.data for item in ['key','value']):
                key = request.data['key']
                value = request.data['value']
                setattr(user, key, value)
                user.save()
                return Response(status=200)
            else:
                 return Response(status=422)
        else:
            return Response(status=401)
        
    def delete(self, request):
        user = isUser(request)
        if user:
            Stores.objects.filter(store_owner = user).delete()
            Users.objects.get(id = user.id).delete()
            return Response(status=200)
        else:
            return Response(status=401)
   
class ManageStore(APIView):
  
    def get(self, request):
        if 'store_id' in request.query_params:
            if Stores.objects.filter(id = request.query_params.get('store_id')).exists():
                shopOwner = Stores.objects.get(id = request.query_params.get('store_id'))
                
            else:
                return Response({"reason":'required store_id '},status=422)
        else:
            shopOwner = Stores.objects.all()
            serialized_store = StoreSerializer(shopOwner, many = True)
            return Response(serialized_store.data, status=200)
        
    def post(self, request):
        user = isUser(request)
        if user:
            try:
                data = request.data
                if 'store_name' in data and 'store_licence_number' in data and 'store_owner_id' in data and 'store_description' in data and 'store_image_url' in data and 'store_open_dates' in data:
                    store_name = data['store_name']
                    store_license_number = data['store_licence_number']
                    store_description = data['store_description']
                    store_image_url = data['store_image_url']
                    store_open_dates = data['store_open_dates']
                    if not Stores.objects.filter(store_name=store_name, store_owner_id = user.id).first():
                        user = Users.objects.filter(id = user.id).first()
                        if user:
                            store = Stores.objects.create( store_name = store_name,
                                                        store_license_number = store_license_number,
                                                        store_desription = store_description,
                                                        store_image_url = store_image_url,
                                                        store_owner = user,
                                                        store_open_dates = store_open_dates)
                            # print(user_name)
                            try:
                                store.save()
                                return Response(status=200)
                                
                            except:
                                return Response(status=500)
                        else:
                            return Response(status=404)
                    else:
                        return Response(status=409)
                else:
                    return Response({'reason':'Required store_name, store_licence_number, store_owner_id, store_description, store_image_url, store_open_dates'},status=422)
            except Exception as e:
                return Response({'reason': e},status=422)
        else:
            return Response(status=401)
    def put(self, request):
        shop_owner_id = request.data['shop_owner_id']
        field = request.data['field']
        value = request.data['value']
            
        if Users.objects.filter(id = shop_owner_id).exists():
            shopOwner = Users.objects.get(id = shop_owner_id)
            return Response(status=200)
    def delete(self, request):
        pass
    
class ManageUserStore(APIView):
    def get(self,request):
        user = isUser(request)
        if user:
            
            stores = Stores.objects.filter(store_owner=user)
            # for store in stores:
            #     divisions = Division.objects.filter(division_store = store)
                
            serialized_stores = StoreSerializer(stores,many=True)
            return Response(serialized_stores.data)
        else:
            return Response(status=401)
        
class ManageDivision(APIView):
    def get(self, request):
        if 'division_id' in request.query_params and 'store_id' in request.query_params:
            store = Stores.objects.filter(id = request.query_params.get('store_id')).first()
            if store:
                if Division.objects.filter(id = request.query_params.get('division_id'), division_store = store ).exists():
                    shopOwner = Division.objects.get(id = request.query_params.get('division_id'))
                    serialized_division = DivisionSerializer(shopOwner, many = False)
                    return Response({'data':serialized_division.data},status=200)
                else:
                    return Response(status=404)
            else:
                return Response(status=404)
        else:
            return Response({"reason":'required division_id, store_id'}, status=422)
        
    def post(self, request):
        try:
            data = request.data
            if 'division_name' in data and 'division_store_id' in data:
                division_name = request.data['division_name']
                division_store_id = request.data['division_store_id']
                # division_unique_id = request.data['division_unique_id']
            
                
                store = Stores.objects.get(id = int(division_store_id))
                
                division = Division.objects.create( division_name = division_name,division_store = store)
                # # print(user_name)
                try:
                    division.save()
                    return Response(status=200)
                    
                except:
                    return Response(status=500)
            else:
                return Response({'reason':'required division_name, division_store_id'},status=422)
        except Exception as e:
            return Response({'reason': e},status=422)
  
    def put(self, request):
        shop_owner_id = request.data['shop_owner_id']
        field = request.data['field']
        value = request.data['value']
            
        if Division.objects.filter(id = shop_owner_id).exists():
            shopOwner = Division.objects.get(id = shop_owner_id)
            
            return Response(status=200)
    def delete(self, request):
        pass
    