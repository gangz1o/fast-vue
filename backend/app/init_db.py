from sqlalchemy.orm import Session
from .database import SessionLocal
from .models.user import User
from .auth import get_password_hash

def init_db():
    db = SessionLocal()
    try:
        # 检查是否已存在管理员用户
        admin_user = db.query(User).filter(User.username == "admin").first()
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
            db.add(admin_user)
            db.commit()
            print("Default admin user created.")
        else:
            print("Admin user already exists.")
    finally:
        db.close()

if __name__ == "__main__":
    init_db()
