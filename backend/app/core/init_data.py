"""
数据初始化模块
用于创建应用所需的初始数据，如管理员用户等
"""
from app.db.models.user import User
from app.core.security import get_password_hash


async def create_initial_data():
    """
    创建应用所需的初始数据
    此函数应该在应用首次部署时调用，而不是每次启动
    """
    # 检查是否已存在管理员用户
    admin_user = await User.filter(username="admin").first()
    if not admin_user:
        # 创建默认管理员用户
        admin_password = get_password_hash("admin123")
        admin_user = User(
            username="admin",
            email="admin@example.com",
            hashed_password=admin_password,
            is_active=True,
            is_admin=True
        )
        await admin_user.save()
        print("Default admin user created.")
    else:
        print("Admin user already exists.")
