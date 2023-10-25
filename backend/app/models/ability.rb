class Ability
  include CanCan::Ability

  def initialize(user)
    if user.admin?
      can :manage, User
    else
      can :manage, Recipe, user_id: user.id
      can :manage, Ingredient, user_id: user.id
      can :manage, RecipeType, user_id: user.id
      can :manage, Tag, user_id: user.id
    end
  end
end
