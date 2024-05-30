from django.db import models

# Create your models here.
class Users(models.Model):
    username    = models.CharField(max_length = 20)
    password    = models.CharField(max_length = 20)
    email       = models.EmailField(unique=True)
    contact     = models.CharField(max_length = 10,default = 0)
    isBlocked   = models.BooleanField(default = False)
    type        = models.CharField(max_length = 20, choices = [('shopowner','shopowner'),('menuitadmin', 'menutitadmin'),('customer','customer')], default = 'shopowner')
    
    def __str__(self) -> str:
        return self.email
    
    class Meta:
        verbose_name_plural = 'Users'
        app_label = 'api'
    
        
class Stores(models.Model):
    store_name              = models.CharField(max_length = 50, null = False)
    store_license_number    = models.CharField(max_length = 50, null = True)
    store_owner             = models.ForeignKey(Users, on_delete = models.CASCADE)
    store_rating            = models.IntegerField(default = 5)
    store_desription        = models.TextField()
    store_image_url         = models.TextField()
    store_open_dates        = models.CharField(max_length = 50)
    
    def __str__(self):
        return self.store_name
    
    class Meta:
        verbose_name_plural = 'Stores'    
        app_label = 'api'

            
class Categories(models.Model):
    category_name            = models.CharField(max_length = 50, null = False)
    category_description     = models.TextField()
    category_image_url       = models.TextField()
    
    def __str__(self):
        return self.category_name
    
    class Meta:
        verbose_name_plural = 'Categories'    
        app_label = 'api'  
        
              
class Division(models.Model):
    division_name = models.CharField(max_length = 100)
    division_store = models.ForeignKey(Stores, on_delete = models.CASCADE)
    division_unique_id = models.IntegerField(default = 0000000000)
    
    def __str__(self) -> str:
        return self.division_name
    class Meta:
        verbose_name_plural = 'division'
        app_label = 'api'
          
class Products(models.Model):
    product_unique_id       = models.CharField(max_length = 50, null = False)
    product_name            = models.CharField(max_length = 50, null = False)
    product_category        = models.ForeignKey(Categories, on_delete = models.CASCADE )
    product_price           = models.IntegerField()
    product_rating          = models.IntegerField(default = 5)
    product_description     = models.TextField()
    product_image_url       = models.TextField()
    product_available       = models.IntegerField(default = 0)
    product_division        = models.ForeignKey(Division, on_delete = models.CASCADE)
    product_store        = models.ForeignKey(Stores, on_delete = models.CASCADE)
    
    def __str__(self):
        return self.product_name
    
    class Meta:
        verbose_name_plural = 'Products'   
        app_label = 'api' 

        
class Advertisments(models.Model):
    ad_unique_id    = models.CharField(max_length = 50)
    ad_name    = models.CharField(max_length = 50 , default = "ad")
    ad_type         = models.CharField(max_length = 50, choices = (('banner','banner'),('video','video')))
    ad_url          = models.TextField()
    ad_store        = models.ForeignKey(Stores, on_delete = models.CASCADE)

    def __str__(self) -> str:
        return self.ad_name
    
    class Meta:
        app_label = 'api'