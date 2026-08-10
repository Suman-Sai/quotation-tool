import numpy as np
import matplotlib.pyplot as plt 
import pandas as pd
import seaborn as sns
import statsmodels.api as sm
from statsmodels.api import OLS

# Importing the warnings library to ignore the warnings in the dataset...
import warnings
warnings.filterwarnings('ignore')

# Importing the necessary libraries for machine learning and evaluation metrics...
from sklearn.model_selection import train_test_split, GridSearchCV, cross_val_score
from statsmodels.tools.eval_measures import rmse
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score, confusion_matrix, classification_report, accuracy_score
from sklearn.tree import DecisionTreeClassifier, plot_tree, DecisionTreeRegressor
from sklearn.compose import ColumnTransformer   
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.ensemble import VotingRegressor, StackingRegressor
from sklearn.ensemble import GradientBoostingRegressor, HistGradientBoostingRegressor
from sklearn.ensemble import RandomForestRegressor, ExtraTreesRegressor